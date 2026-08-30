import { describe, expect, it } from 'vitest'

import {
  normalizeAgentFOXXYOpenString,
  pathFromAgentFOXXYDeepLink,
  pathFromOpenDeepLink,
  resolveAgentFOXXYOpenPath
} from './agentfoxxy-open-target'

describe('normalizeAgentFOXXYOpenString', () => {
  it('accepts hash-router paths and strips a leading hash', () => {
    expect(normalizeAgentFOXXYOpenString('/index-network/intent/1')).toBe('/index-network/intent/1')
    expect(normalizeAgentFOXXYOpenString('#/index-network/intent/1')).toBe('/index-network/intent/1')
  })

  it('maps plugin-scoped agentfoxxy:// deep links to the same path', () => {
    expect(normalizeAgentFOXXYOpenString('agentfoxxy://index-network/intent/1')).toBe('/index-network/intent/1')
    expect(normalizeAgentFOXXYOpenString('agentfoxxy://index-network/intent/1?focus=true')).toBe(
      '/index-network/intent/1?focus=true'
    )
  })

  it('maps agentfoxxy://open/… deep links by stripping the open host', () => {
    expect(normalizeAgentFOXXYOpenString('agentfoxxy://open/index-network/intent/1')).toBe('/index-network/intent/1')
    expect(normalizeAgentFOXXYOpenString('agentfoxxy://open/settings/plugins')).toBe('/settings/plugins')
  })

  it('rejects reserved agentfoxxy kinds and unsafe paths', () => {
    expect(normalizeAgentFOXXYOpenString('agentfoxxy://blueprint/morning-brief')).toBeNull()
    expect(normalizeAgentFOXXYOpenString('agentfoxxy://plugin/install')).toBeNull()
    expect(normalizeAgentFOXXYOpenString('https://example.com/x')).toBeNull()
    expect(normalizeAgentFOXXYOpenString('/../etc/passwd')).toBeNull()
    expect(normalizeAgentFOXXYOpenString('index-network')).toBeNull()
  })
})

describe('resolveAgentFOXXYOpenPath', () => {
  it('merges structured path + params', () => {
    expect(resolveAgentFOXXYOpenPath({ path: '/index-network/intent/1', params: { focus: 'true' } })).toBe(
      '/index-network/intent/1?focus=true'
    )
  })

  it('resolves href the same as a bare string', () => {
    expect(resolveAgentFOXXYOpenPath({ href: 'agentfoxxy://index-network/intent/1' })).toBe('/index-network/intent/1')
  })
})

describe('pathFromAgentFOXXYDeepLink', () => {
  it('builds the navigate path from a plugin-scoped deep-link payload', () => {
    expect(pathFromAgentFOXXYDeepLink('index-network', 'intent/1')).toBe('/index-network/intent/1')
  })

  it('builds the navigate path from agentfoxxy://open/… payloads', () => {
    expect(pathFromOpenDeepLink('index-network/intent/1')).toBe('/index-network/intent/1')
    expect(pathFromAgentFOXXYDeepLink('open', 'agent/42')).toBe('/agent/42')
  })

  it('ignores reserved kinds', () => {
    expect(pathFromAgentFOXXYDeepLink('blueprint', 'morning-brief')).toBeNull()
    expect(pathFromAgentFOXXYDeepLink('plugin', 'install')).toBeNull()
  })
})
