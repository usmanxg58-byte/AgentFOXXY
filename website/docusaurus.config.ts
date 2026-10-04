import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AgentFOXXY',
  tagline: 'The open-source AI agent that gets the work done',
  favicon: 'img/favicon.svg',

  url: 'https://usmanxg58-byte.github.io',
  baseUrl: '/AgentFOXXY/docs/',
  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'AgentFOXXY',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Linux, macOS, Windows, Android (Termux)',
        description:
          'An open-source autonomous AI agent that plans tasks, uses real tools, writes and runs code, and saves reusable skills.',
        url: 'https://usmanxg58-byte.github.io/AgentFOXXY/docs/',
        downloadUrl: 'https://github.com/usmanxg58-byte/AgentFOXXY/releases/latest',
        codeRepository: 'https://github.com/usmanxg58-byte/AgentFOXXY',
        license: 'https://opensource.org/license/mit/',
        isAccessibleForFree: true,
        sameAs: [
          'https://github.com/usmanxg58-byte/AgentFOXXY',
          'https://x.com/theagentfoxxy',
        ],
      }),
    },
  ],

  organizationName: 'usmanxg58-byte',
  projectName: 'AgentFOXXY',

  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      'zh-Hans': {
        label: '简体中文',
        htmlLang: 'zh-Hans',
      },
    },
  },

  themes: [
    '@docusaurus/theme-mermaid',
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Static-host redirects for renamed doc pages (GitHub Pages can't
        // do server-side redirects). Paths are relative to baseUrl (/docs/).
        redirects: [
          {
            // Renamed in #44470 (Automation Blueprints terminology rebrand)
            from: '/guides/automation-templates',
            to: '/guides/automation-blueprints',
          },
          {
            // Moved when the Plugins subcategory was created under
            // Developer Guide > Extending (docs restructure, July 2026)
            from: '/guides/build-a-agentfoxxy-plugin',
            to: '/developer-guide/plugins',
          },
          {
            // Users guess these short paths from abbreviated links and hit
            // raw 404s (consumer-onboarding audit finding #1, Aug 2026).
            from: '/quickstart',
            to: '/getting-started/quickstart',
          },
          {
            from: '/installation',
            to: '/getting-started/installation',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',  // Docs at the root of /docs/
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/usmanxg58-byte/AgentFOXXY/edit/main/website/',
        },
        blog: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/agentfoxxy-agent-banner.png',
    metadata: [
      {name: 'twitter:site', content: '@theagentfoxxy'},
      {name: 'twitter:creator', content: '@theagentfoxxy'},
    ],
    // Algolia DocSearch (replaces @easyops-cn/docusaurus-search-local).
    // The local plugin shipped a ~16 MB client-side lunr index that every
    // visitor downloaded and hydrated before their first result; DocSearch
    // answers from Algolia's servers with no client index at all. These are
    // public search-only credentials — safe to commit (the admin key is not
    // in the repo). Index is populated by the Algolia Crawler configured at
    // crawler.algolia.com; contextualSearch scopes results to the active
    // locale via the docusaurus_tag/lang facets the crawler records carry.
    algolia: {
      appId: '2JLBVEYZN5',
      apiKey: '8fda2a49223ce185ac30c2dbf6898a07',
      indexName: 'agentfoxxy docs',
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'AgentFOXXY',
      logo: {
        alt: 'AgentFOXXY Agent',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/skills',
          label: 'Skills',
          position: 'left',
        },
        {
          to: '/getting-started/installation',
          label: 'Install',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/usmanxg58-byte/AgentFOXXY',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://x.com/theagentfoxxy',
          label: 'X',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/getting-started/quickstart' },
            { label: 'User Guide', to: '/user-guide/cli' },
            { label: 'Developer Guide', to: '/developer-guide/architecture' },
            { label: 'Reference', to: '/reference/cli-commands' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://discord.gg/NousResearch' },
            { label: 'GitHub Issues', href: 'https://github.com/usmanxg58-byte/AgentFOXXY/issues' },
            { label: 'Skills Hub', href: 'https://agentskills.io' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Desktop downloads', href: 'https://github.com/usmanxg58-byte/AgentFOXXY/releases/latest' },
            { label: 'GitHub repository', href: 'https://github.com/usmanxg58-byte/AgentFOXXY' },
            { label: 'Follow @theagentfoxxy', href: 'https://x.com/theagentfoxxy' },
          ],
        },
      ],
      copyright: `AgentFOXXY · MIT License · ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json', 'python', 'toml'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
