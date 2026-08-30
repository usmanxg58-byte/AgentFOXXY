import { contextBridge, ipcRenderer, webFrame, webUtils } from 'electron'

// Which translucency the OS can back. Asked synchronously because the renderer
// needs it before its first paint, and answered by main because deciding it
// needs `os.release()` — a sandboxed preload may only require electron, events,
// timers and url, so importing node:os here throws before contextBridge runs
// and takes the ENTIRE bridge down with it (window.agentfoxxyDesktop undefined =>
// "Desktop IPC bridge is unavailable"). No reply means no glass, which degrades
// to an ordinary opaque window rather than a page thinned over nothing.
const translucencySupport = ipcRenderer.sendSync('agentfoxxy:translucency:support')
const hudWindowing = ipcRenderer.sendSync('agentfoxxy:hud:windowing')
const hudNativeDrag = hudWindowing?.nativeDrag === true

contextBridge.exposeInMainWorld('agentfoxxyDesktop', {
  glassSupported: translucencySupport?.glass === true,
  translucencySupported: translucencySupport?.translucency === true,
  getConnection: profile => ipcRenderer.invoke('agentfoxxy:connection', profile),
  // Registry-scoped backend resolution: { connectionId, profile } → descriptor.
  getConnectionFor: payload => ipcRenderer.invoke('agentfoxxy:connection:for', payload),
  getProfileRoutes: profiles => ipcRenderer.invoke('agentfoxxy:plugin-profile-routes', profiles),
  revalidateConnection: () => ipcRenderer.invoke('agentfoxxy:connection:revalidate'),
  touchBackend: profile => ipcRenderer.invoke('agentfoxxy:backend:touch', profile),
  getGatewayWsUrl: profile => ipcRenderer.invoke('agentfoxxy:gateway:ws-url', profile),
  // Registry-scoped fresh WS URL: { connectionId, profile } → result shape of
  // getGatewayWsUrl, minted against that connection's backend.
  getGatewayWsUrlFor: payload => ipcRenderer.invoke('agentfoxxy:gateway:ws-url-for', payload),
  // Union agent roster across every registered connection.
  getAgentRoster: () => ipcRenderer.invoke('agentfoxxy:agents:roster'),
  openSessionWindow: (sessionId, opts) => ipcRenderer.invoke('agentfoxxy:window:openSession', sessionId, opts),
  openSessionInTerminal: (sessionId, opts) => ipcRenderer.invoke('agentfoxxy:window:openInTerminal', sessionId, opts),
  openWindow: () => ipcRenderer.invoke('agentfoxxy:window:openInstance'),
  openBrowserWindow: tabId => ipcRenderer.invoke('agentfoxxy:window:openBrowser', tabId),
  onBrowserPopoutClosed: callback => {
    const listener = (_event, tabId) => callback(tabId)
    ipcRenderer.on('agentfoxxy:browser-popout:closed', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:browser-popout:closed', listener)
  },
  claimAmbientCue: key => ipcRenderer.invoke('agentfoxxy:ambient:claim', key),
  wakeIndicator: {
    getState: () => ipcRenderer.invoke('agentfoxxy:wake-indicator:get'),
    setState: state => ipcRenderer.send('agentfoxxy:wake-indicator:set', state),
    onState: callback => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('agentfoxxy:wake-indicator:state', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:wake-indicator:state', listener)
    }
  },
  petOverlay: {
    // Main renderer → main process: window lifecycle + drag. `request` is
    // `{ bounds, screen }`; resolves with the screen bounds it actually used.
    open: request => ipcRenderer.invoke('agentfoxxy:pet-overlay:open', request),
    close: () => ipcRenderer.invoke('agentfoxxy:pet-overlay:close'),
    setBounds: bounds => ipcRenderer.send('agentfoxxy:pet-overlay:set-bounds', bounds),
    setIgnoreMouse: ignore => ipcRenderer.send('agentfoxxy:pet-overlay:ignore-mouse', ignore),
    // Flip the overlay focusable (and focus it) while the composer needs keys.
    setFocusable: focusable => ipcRenderer.send('agentfoxxy:pet-overlay:set-focusable', focusable),
    // Main renderer → overlay (forwarded by main): push the latest pet state.
    pushState: payload => ipcRenderer.send('agentfoxxy:pet-overlay:state', payload),
    // Overlay → main renderer (forwarded by main): pop back in / composer submit.
    control: payload => ipcRenderer.send('agentfoxxy:pet-overlay:control', payload),
    // Overlay subscribes to state pushes.
    onState: callback => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('agentfoxxy:pet-overlay:state', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:pet-overlay:state', listener)
    },
    // Main renderer subscribes to overlay control messages.
    onControl: callback => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('agentfoxxy:pet-overlay:control', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:pet-overlay:control', listener)
    }
  },
  // HUD mode: the chrome-free floating chat. A full app renderer (own gateway)
  // sized as a floating bar, so it mounts the real composer. Main owns the
  // window; `onChanged` keeps every window's toggle truthful.
  hud: {
    nativeDrag: hudNativeDrag,
    windowing: {
      clientPlacement: hudWindowing?.clientPlacement !== false,
      controlDrag: hudWindowing?.controlDrag === true,
      nativeDrag: hudNativeDrag,
      workspaceTransfer: hudWindowing?.workspaceTransfer === true
    },
    open: request => ipcRenderer.invoke('agentfoxxy:hud:open', request),
    close: () => ipcRenderer.invoke('agentfoxxy:hud:close'),
    setIgnoreMouse: ignore => ipcRenderer.send('agentfoxxy:hud:ignore-mouse', ignore),
    moveBy: delta => ipcRenderer.send('agentfoxxy:hud:move-by', delta),
    setWorkspaceTransfer: transferring => ipcRenderer.send('agentfoxxy:hud:workspace-transfer', transferring),
    setBounds: bounds => ipcRenderer.send('agentfoxxy:hud:set-bounds', bounds),
    resetLayout: () => ipcRenderer.invoke('agentfoxxy:hud:reset-layout'),
    // Whether the band covers the window below the bar. Main pairs it with the
    // user's translucency setting to decide the native frost (macOS vibrancy /
    // Windows 11 DWM backdrop) — see hudFrostFor.
    setFrost: showing => ipcRenderer.invoke('agentfoxxy:hud:frost', showing),
    // The HUD tells main which session it is on; main hands that back to the
    // app window when the HUD closes, so the app can re-home onto it.
    setSession: sessionId => ipcRenderer.send('agentfoxxy:hud:session', sessionId),
    onGoto: callback => {
      const listener = (_event, sessionId) => callback(sessionId)
      ipcRenderer.on('agentfoxxy:hud:goto', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:hud:goto', listener)
    },
    onChanged: callback => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('agentfoxxy:hud:changed', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:hud:changed', listener)
    },
    // Linux only, and silent elsewhere: where the cursor is, in page
    // coordinates, or null when it has left the window. Stands in for the
    // mousemove that `setIgnoreMouseEvents(true, { forward: true })` delivers on
    // macOS and Windows but not here.
    onCursor: callback => {
      const listener = (_event, point) => callback(point)
      ipcRenderer.on('agentfoxxy:hud:cursor', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:hud:cursor', listener)
    },
    // Main's game-overlay watch: whether a fullscreen app (a game) is under
    // the HUD, so the renderer can step back to the low-opacity overlay
    // treatment while one owns the screen.
    onGameOverlay: callback => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('agentfoxxy:hud:game-overlay', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:hud:game-overlay', listener)
    }
  },
  // Quick Entry: the global-hotkey mini composer window. Main owns the OS
  // shortcut + the persisted preference; the quick window only captures text
  // and hands it back, and the primary renderer submits it through the normal
  // prompt path.
  quickEntry: {
    getSettings: () => ipcRenderer.invoke('agentfoxxy:quick-entry:settings:get'),
    setSettings: patch => ipcRenderer.invoke('agentfoxxy:quick-entry:settings:set', patch),
    submit: payload => ipcRenderer.send('agentfoxxy:quick-entry:submit', payload),
    dismiss: () => ipcRenderer.send('agentfoxxy:quick-entry:dismiss'),
    // Primary renderer → main → quick window: gateway connection state + the
    // recent-session options the target picker offers. Main caches the latest
    // payload so a freshly spawned quick window starts from truth.
    pushState: payload => ipcRenderer.send('agentfoxxy:quick-entry:state', payload),
    // Quick window subscribes to those pushes.
    onState: callback => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('agentfoxxy:quick-entry:state', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:quick-entry:state', listener)
    },
    // Main → primary renderer: a submit captured by the quick window.
    onSubmit: callback => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('agentfoxxy:quick-entry:submit', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:quick-entry:submit', listener)
    },
    // Main → quick window: you were just summoned (reset draft + refocus).
    onShown: callback => {
      const listener = () => callback()
      ipcRenderer.on('agentfoxxy:quick-entry:shown', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:quick-entry:shown', listener)
    }
  },
  getBootProgress: () => ipcRenderer.invoke('agentfoxxy:boot-progress:get'),
  getConnectionConfig: profile => ipcRenderer.invoke('agentfoxxy:connection-config:get', profile),
  saveConnectionConfig: payload => ipcRenderer.invoke('agentfoxxy:connection-config:save', payload),
  applyConnectionConfig: payload => ipcRenderer.invoke('agentfoxxy:connection-config:apply', payload),
  testConnectionConfig: payload => ipcRenderer.invoke('agentfoxxy:connection-config:test', payload),
  // Opt-in OS-keychain encryption for stored gateway secrets (default off —
  // see secret-storage-policy.ts). get never touches the OS keychain.
  getSecretStorageEncryption: () => ipcRenderer.invoke('agentfoxxy:secret-storage:get'),
  setSecretStorageEncryption: (on: boolean) => ipcRenderer.invoke('agentfoxxy:secret-storage:set', on),
  // v2 multi-connection registry: named agent sources (local / remote / cloud / ssh).
  connections: {
    list: () => ipcRenderer.invoke('agentfoxxy:connections:list'),
    save: payload => ipcRenderer.invoke('agentfoxxy:connections:save', payload),
    remove: id => ipcRenderer.invoke('agentfoxxy:connections:remove', id),
    setPrimary: id => ipcRenderer.invoke('agentfoxxy:connections:set-primary', id),
    setLaunchMode: mode => ipcRenderer.invoke('agentfoxxy:connections:set-launch-mode', mode),
    setLastUsed: id => ipcRenderer.invoke('agentfoxxy:connections:set-last-used', id),
    test: id => ipcRenderer.invoke('agentfoxxy:connections:test', id),
    updateManaged: id => ipcRenderer.invoke('agentfoxxy:connections:update-managed', id),
    // Fan out `agentfoxxy update` to every eligible registered connection.
    // Optional excludeIds skips rows the caller updates through another path.
    updateAll: options => ipcRenderer.invoke('agentfoxxy:connections:update-all', options),
    // Registry lifecycle push (main → renderer): a connection was removed or
    // materially edited, so secondaries scoped to it must be disposed (and,
    // for edits, re-dialed at the new target).
    onChanged: callback => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('agentfoxxy:connections:changed', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:connections:changed', listener)
    }
  },
  sshConfigHosts: () => ipcRenderer.invoke('agentfoxxy:ssh-config:hosts'),
  sshResolveHost: host => ipcRenderer.invoke('agentfoxxy:ssh-config:resolve', host),
  probeConnectionConfig: remoteUrl => ipcRenderer.invoke('agentfoxxy:connection-config:probe', remoteUrl),
  oauthLoginConnectionConfig: remoteUrl => ipcRenderer.invoke('agentfoxxy:connection-config:oauth-login', remoteUrl),
  oauthLogoutConnectionConfig: remoteUrl => ipcRenderer.invoke('agentfoxxy:connection-config:oauth-logout', remoteUrl),
  // AgentFOXXY Cloud: one portal login powers discovery + silent per-agent sign-in
  // (cloud-auto-discovery Phase 3).
  cloud: {
    status: () => ipcRenderer.invoke('agentfoxxy:cloud:status'),
    login: () => ipcRenderer.invoke('agentfoxxy:cloud:login'),
    logout: () => ipcRenderer.invoke('agentfoxxy:cloud:logout'),
    discover: org => ipcRenderer.invoke('agentfoxxy:cloud:discover', org),
    agentSignIn: dashboardUrl => ipcRenderer.invoke('agentfoxxy:cloud:agent-sign-in', dashboardUrl)
  },
  profile: {
    get: () => ipcRenderer.invoke('agentfoxxy:profile:get'),
    remember: name => ipcRenderer.invoke('agentfoxxy:profile:remember', name),
    set: name => ipcRenderer.invoke('agentfoxxy:profile:set', name)
  },
  api: request => ipcRenderer.invoke('agentfoxxy:api', request),
  notify: payload => ipcRenderer.invoke('agentfoxxy:notify', payload),
  requestMicrophoneAccess: () => ipcRenderer.invoke('agentfoxxy:requestMicrophoneAccess'),
  readWindowBelow: () => ipcRenderer.invoke('agentfoxxy:window:readBelow'),
  readFileDataUrl: filePath => ipcRenderer.invoke('agentfoxxy:readFileDataUrl', filePath),
  readFileDataUrlForAttach: filePath => ipcRenderer.invoke('agentfoxxy:readFileDataUrlForAttach', filePath),
  dataUrlReadMax: {
    get: () => ipcRenderer.invoke('agentfoxxy:data-url-read-max:get'),
    set: maxMb => ipcRenderer.invoke('agentfoxxy:data-url-read-max:set', maxMb)
  },
  readFileText: filePath => ipcRenderer.invoke('agentfoxxy:readFileText', filePath),
  readPluginSource: (filePath: string) => ipcRenderer.invoke('agentfoxxy:readPluginSource', filePath),
  selectPaths: options => ipcRenderer.invoke('agentfoxxy:selectPaths', options),
  selectSavePath: options => ipcRenderer.invoke('agentfoxxy:selectSavePath', options),
  writeClipboard: text => ipcRenderer.invoke('agentfoxxy:writeClipboard', text),
  readClipboard: () => ipcRenderer.invoke('agentfoxxy:readClipboard'),
  saveGatewayFile: payload => ipcRenderer.invoke('agentfoxxy:saveGatewayFile', payload),
  saveImageFromUrl: url => ipcRenderer.invoke('agentfoxxy:saveImageFromUrl', url),
  contextMenuEdit: command => ipcRenderer.invoke('agentfoxxy:context-menu:edit', command),
  contextMenuCopyImage: () => ipcRenderer.invoke('agentfoxxy:context-menu:copy-image'),
  contextMenuSpellcheck: action => ipcRenderer.invoke('agentfoxxy:context-menu:spellcheck', action),
  contextMenuGuestAddWord: payload => ipcRenderer.invoke('agentfoxxy:context-menu:guest-add-word', payload),
  onContextMenuSpellcheck: callback => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('agentfoxxy:context-menu-spellcheck', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:context-menu-spellcheck', listener)
  },
  saveImageBuffer: (data, ext) => ipcRenderer.invoke('agentfoxxy:saveImageBuffer', { data, ext }),
  saveClipboardImage: () => ipcRenderer.invoke('agentfoxxy:saveClipboardImage'),
  getPathForFile: file => {
    try {
      return webUtils.getPathForFile(file) || ''
    } catch {
      return ''
    }
  },
  normalizePreviewTarget: (target, baseDir) => ipcRenderer.invoke('agentfoxxy:normalizePreviewTarget', target, baseDir),
  watchPreviewFile: url => ipcRenderer.invoke('agentfoxxy:watchPreviewFile', url),
  watchDirectory: dir => ipcRenderer.invoke('agentfoxxy:watchDirectory', dir),
  stopPreviewFileWatch: id => ipcRenderer.invoke('agentfoxxy:stopPreviewFileWatch', id),
  setActiveWork: payload => ipcRenderer.send('agentfoxxy:active-work', payload),
  setTitleBarTheme: payload => ipcRenderer.send('agentfoxxy:titlebar-theme', payload),
  setNativeTheme: mode => ipcRenderer.send('agentfoxxy:native-theme', mode),
  setTranslucency: payload => ipcRenderer.send('agentfoxxy:translucency', payload),
  setKeepAwake: on => ipcRenderer.send('agentfoxxy:keep-awake', on),
  setDisableF12: blocked => ipcRenderer.send('agentfoxxy:devtools:disable-f12', blocked),
  setPreviewShortcutActive: active => ipcRenderer.send('agentfoxxy:previewShortcutActive', Boolean(active)),
  openExternal: url => ipcRenderer.invoke('agentfoxxy:openExternal', url),
  openPreviewInBrowser: url => ipcRenderer.invoke('agentfoxxy:openPreviewInBrowser', url),
  reachPreviewUrl: url => ipcRenderer.invoke('agentfoxxy:preview:reach', url),
  setActiveConnectionRoute: route => ipcRenderer.send('agentfoxxy:connection:active-route', route),
  fetchLinkTitle: url => ipcRenderer.invoke('agentfoxxy:fetchLinkTitle', url),
  resolveFavicon: url => ipcRenderer.invoke('agentfoxxy:resolveFavicon', url),
  sanitizeWorkspaceCwd: cwd => ipcRenderer.invoke('agentfoxxy:workspace:sanitize', cwd),
  settings: {
    getDefaultProjectDir: () => ipcRenderer.invoke('agentfoxxy:setting:defaultProjectDir:get'),
    setDefaultProjectDir: dir => ipcRenderer.invoke('agentfoxxy:setting:defaultProjectDir:set', dir),
    pickDefaultProjectDir: () => ipcRenderer.invoke('agentfoxxy:setting:defaultProjectDir:pick')
  },
  zoom: {
    // Current zoom of this window, as { level, percent }.
    get: () => ipcRenderer.invoke('agentfoxxy:zoom:get'),
    // Synchronous zoom factor (1 = 100%). Coordinate math needs it in the
    // same tick as the event it converts, so no IPC round-trip here.
    factor: () => webFrame.getZoomFactor(),
    setPercent: percent => ipcRenderer.send('agentfoxxy:zoom:set-percent', percent),
    // Fires on every zoom change, including the Ctrl/Cmd +/-/0 shortcuts,
    // so the settings UI can stay in sync with the keyboard.
    onChanged: callback => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('agentfoxxy:zoom:changed', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:zoom:changed', listener)
    }
  },
  revealLogs: () => ipcRenderer.invoke('agentfoxxy:logs:reveal'),
  getRecentLogs: () => ipcRenderer.invoke('agentfoxxy:logs:recent'),
  // Fire-and-forget: persists a renderer error-boundary catch (with component
  // stack) to desktop.log so crashes survive the window (#79428).
  reportRendererError: report => ipcRenderer.send('agentfoxxy:logs:renderer-error', report),
  readDir: dirPath => ipcRenderer.invoke('agentfoxxy:fs:readDir', dirPath),
  gitRoot: startPath => ipcRenderer.invoke('agentfoxxy:fs:gitRoot', startPath),
  revealPath: targetPath => ipcRenderer.invoke('agentfoxxy:fs:reveal', targetPath),
  openDir: dirPath => ipcRenderer.invoke('agentfoxxy:fs:openDir', dirPath),
  desktopPluginsRoot: () => ipcRenderer.invoke('agentfoxxy:fs:desktopPluginsRoot'),
  logsRoot: () => ipcRenderer.invoke('agentfoxxy:fs:logsRoot'),
  agentPluginsRoot: () => ipcRenderer.invoke('agentfoxxy:fs:agentPluginsRoot'),
  renamePath: (targetPath, newName) => ipcRenderer.invoke('agentfoxxy:fs:rename', targetPath, newName),
  writeTextFile: (filePath, content) => ipcRenderer.invoke('agentfoxxy:fs:writeText', filePath, content),
  trashPath: targetPath => ipcRenderer.invoke('agentfoxxy:fs:trash', targetPath),
  git: {
    worktreeList: repoPath => ipcRenderer.invoke('agentfoxxy:git:worktreeList', repoPath),
    worktreeAdd: (repoPath, options) => ipcRenderer.invoke('agentfoxxy:git:worktreeAdd', repoPath, options),
    worktreeRemove: (repoPath, worktreePath, options) =>
      ipcRenderer.invoke('agentfoxxy:git:worktreeRemove', repoPath, worktreePath, options),
    branchSwitch: (repoPath, branch) => ipcRenderer.invoke('agentfoxxy:git:branchSwitch', repoPath, branch),
    branchList: repoPath => ipcRenderer.invoke('agentfoxxy:git:branchList', repoPath),
    baseBranchList: repoPath => ipcRenderer.invoke('agentfoxxy:git:baseBranchList', repoPath),
    repoStatus: repoPath => ipcRenderer.invoke('agentfoxxy:git:repoStatus', repoPath),
    fileDiff: (repoPath, filePath) => ipcRenderer.invoke('agentfoxxy:git:fileDiff', repoPath, filePath),
    scanRepos: (roots, options) => ipcRenderer.invoke('agentfoxxy:git:scanRepos', roots, options),
    review: {
      list: (repoPath, scope, baseRef) => ipcRenderer.invoke('agentfoxxy:git:review:list', repoPath, scope, baseRef),
      diff: (repoPath, filePath, scope, baseRef, staged) =>
        ipcRenderer.invoke('agentfoxxy:git:review:diff', repoPath, filePath, scope, baseRef, staged),
      stage: (repoPath, filePath) => ipcRenderer.invoke('agentfoxxy:git:review:stage', repoPath, filePath),
      unstage: (repoPath, filePath) => ipcRenderer.invoke('agentfoxxy:git:review:unstage', repoPath, filePath),
      revert: (repoPath, filePath) => ipcRenderer.invoke('agentfoxxy:git:review:revert', repoPath, filePath),
      revParse: (repoPath, ref) => ipcRenderer.invoke('agentfoxxy:git:review:revParse', repoPath, ref),
      commit: (repoPath, message, push) => ipcRenderer.invoke('agentfoxxy:git:review:commit', repoPath, message, push),
      commitContext: repoPath => ipcRenderer.invoke('agentfoxxy:git:review:commitContext', repoPath),
      push: repoPath => ipcRenderer.invoke('agentfoxxy:git:review:push', repoPath),
      shipInfo: repoPath => ipcRenderer.invoke('agentfoxxy:git:review:shipInfo', repoPath),
      prList: (repoPath, branches, numbers) =>
        ipcRenderer.invoke('agentfoxxy:git:review:prList', repoPath, branches, numbers),
      fetchPrComment: (repoPath, url) => ipcRenderer.invoke('agentfoxxy:git:review:fetchPrComment', repoPath, url),
      createPr: repoPath => ipcRenderer.invoke('agentfoxxy:git:review:createPr', repoPath)
    }
  },
  terminal: {
    cwd: id => ipcRenderer.invoke('agentfoxxy:terminal:cwd', id),
    dispose: id => ipcRenderer.invoke('agentfoxxy:terminal:dispose', id),
    resize: (id, size) => ipcRenderer.invoke('agentfoxxy:terminal:resize', id, size),
    start: options => ipcRenderer.invoke('agentfoxxy:terminal:start', options),
    write: (id, data) => ipcRenderer.invoke('agentfoxxy:terminal:write', id, data),
    onData: (id, callback) => {
      const channel = `agentfoxxy:terminal:${id}:data`
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on(channel, listener)

      return () => ipcRenderer.removeListener(channel, listener)
    },
    onExit: (id, callback) => {
      const channel = `agentfoxxy:terminal:${id}:exit`
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on(channel, listener)

      return () => ipcRenderer.removeListener(channel, listener)
    }
  },
  onClosePreviewRequested: callback => {
    const listener = () => callback()
    ipcRenderer.on('agentfoxxy:close-preview-requested', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:close-preview-requested', listener)
  },
  onPreviewNav: callback => {
    const listener = (_event, command) => callback(command)
    ipcRenderer.on('agentfoxxy:preview-nav', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:preview-nav', listener)
  },
  onOpenFolderRequested: callback => {
    const listener = () => callback()
    ipcRenderer.on('agentfoxxy:open-folder-requested', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:open-folder-requested', listener)
  },
  onOpenUpdatesRequested: callback => {
    const listener = () => callback()
    ipcRenderer.on('agentfoxxy:open-updates', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:open-updates', listener)
  },
  onDeepLink: callback => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('agentfoxxy:deep-link', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:deep-link', listener)
  },
  signalDeepLinkReady: () => ipcRenderer.invoke('agentfoxxy:deep-link-ready'),
  probePluginRepo: payload => ipcRenderer.invoke('agentfoxxy:plugin:probe', payload),
  installDesktopPlugin: payload => ipcRenderer.invoke('agentfoxxy:plugin:installDesktop', payload),
  onWindowStateChanged: callback => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('agentfoxxy:window-state-changed', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:window-state-changed', listener)
  },
  onFocusSession: callback => {
    const listener = (_event, sessionId) => callback(sessionId)
    ipcRenderer.on('agentfoxxy:focus-session', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:focus-session', listener)
  },
  onNotificationAction: callback => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('agentfoxxy:notification-action', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:notification-action', listener)
  },
  onNotificationActivate: callback => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('agentfoxxy:notification-activate', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:notification-activate', listener)
  },
  onPreviewFileChanged: callback => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('agentfoxxy:preview-file-changed', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:preview-file-changed', listener)
  },
  onBackendExit: callback => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('agentfoxxy:backend-exit', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:backend-exit', listener)
  },
  // Soft gateway-mode apply finished tearing down the primary backend. Renderer
  // should wipe session lists + re-dial without a window reload.
  onConnectionApplied: callback => {
    const listener = () => callback()
    ipcRenderer.on('agentfoxxy:connection:applied', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:connection:applied', listener)
  },
  onPowerResume: callback => {
    const listener = () => callback()
    ipcRenderer.on('agentfoxxy:power-resume', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:power-resume', listener)
  },
  // AC ↔ battery transitions; renderers slow their backstop polls on battery.
  getOnBattery: () => ipcRenderer.invoke('agentfoxxy:power-battery:get'),
  onBatteryChanged: callback => {
    const listener = (_event, onBattery) => callback(Boolean(onBattery))
    ipcRenderer.on('agentfoxxy:power-battery', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:power-battery', listener)
  },
  onBootProgress: callback => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('agentfoxxy:boot-progress', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:boot-progress', listener)
  },
  // First-launch bootstrap progress -- emitted by the install.ps1 stage
  // runner in main.ts (apps/desktop/electron/bootstrap-runner.ts).
  // Renderer's install overlay subscribes to live events and queries the
  // current snapshot via getBootstrapState() to recover after a devtools
  // reload mid-bootstrap.
  getBootstrapState: () => ipcRenderer.invoke('agentfoxxy:bootstrap:get'),
  continueBootstrapLocal: () => ipcRenderer.invoke('agentfoxxy:bootstrap:continue-local'),
  resetBootstrap: () => ipcRenderer.invoke('agentfoxxy:bootstrap:reset'),
  repairBootstrap: () => ipcRenderer.invoke('agentfoxxy:bootstrap:repair'),
  cancelBootstrap: () => ipcRenderer.invoke('agentfoxxy:bootstrap:cancel'),
  onBootstrapEvent: callback => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('agentfoxxy:bootstrap:event', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:bootstrap:event', listener)
  },
  getVersion: () => ipcRenderer.invoke('agentfoxxy:version'),
  getRemoteDisplayReason: () => ipcRenderer.invoke('agentfoxxy:get-remote-display-reason'),
  uninstall: {
    summary: () => ipcRenderer.invoke('agentfoxxy:uninstall:summary'),
    run: mode => ipcRenderer.invoke('agentfoxxy:uninstall:run', { mode })
  },
  updates: {
    check: () => ipcRenderer.invoke('agentfoxxy:updates:check'),
    apply: opts => ipcRenderer.invoke('agentfoxxy:updates:apply', opts),
    getBranch: () => ipcRenderer.invoke('agentfoxxy:updates:branch:get'),
    setBranch: name => ipcRenderer.invoke('agentfoxxy:updates:branch:set', name),
    onProgress: callback => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('agentfoxxy:updates:progress', listener)

      return () => ipcRenderer.removeListener('agentfoxxy:updates:progress', listener)
    }
  },
  themes: {
    fetchMarketplace: id => ipcRenderer.invoke('agentfoxxy:vscode-theme:fetch', id),
    searchMarketplace: query => ipcRenderer.invoke('agentfoxxy:vscode-theme:search', query)
  },
  // Find-in-page (Ctrl/Cmd+F): delegates to Electron's
  // webContents.findInPage on the IPC sender's window so a Cmd+F pressed
  // in a secondary session window searches THAT window, not the primary.
  // `onFoundInPage` returns the unsubscribe fn; the renderer wires it via
  // `initFindInPageListener` in store/find-in-page.ts and tears it down
  // when the FindBar unmounts.
  findInPage: (query, options) => ipcRenderer.invoke('agentfoxxy:find-in-page', query, options),
  stopFindInPage: () => ipcRenderer.invoke('agentfoxxy:stop-find-in-page'),
  onFoundInPage: callback => {
    const listener = (_event, result) => callback(result)
    ipcRenderer.on('agentfoxxy:found-in-page', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:found-in-page', listener)
  },
  // Main-process `before-input-event` forwards Ctrl/Cmd+F here so renderer
  // can open the FindBar even when the GTK compositor has already grabbed
  // the chord at the windowing layer (#81727).
  onOpenFindBarRequested: callback => {
    const listener = () => callback()
    ipcRenderer.on('agentfoxxy:open-find-bar', listener)

    return () => ipcRenderer.removeListener('agentfoxxy:open-find-bar', listener)
  }
})
