import { defineConfig, DefaultTheme } from 'vitepress'

const ogDescription = 'A low-level and functional virtual CSS library with no CSS codes'
const ogImage = 'https://artisjs.netlify.app/og-image.png'
const ogTitle = 'Artis JS'
const ogUrl = 'https://artisjs.netlify.app'

// netlify envs
const deployURL = process.env.DEPLOY_PRIME_URL || ''
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

const deployType = (() => {
  switch (deployURL) {
    case 'https://artisjs.netlify.app':
      return 'main'
    case '':
      return 'local'
    default:
      return 'release'
  }
})()
const additionalTitle = ((): string => {
  switch (deployType) {
    case 'main':
      return ' (main branch)'
    case 'local':
      return ' (local)'
    case 'release':
      return ''
  }
})()

export default defineConfig({
  lang: 'en-US',
  title: `Artis.js Documentation`,
  description: 'A low-level and functional virtual CSS library with no CSS codes',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@knottjs' }],
    ['meta', { name: 'theme-color', content: '#646cff' }]
  ],

  markdown: {
    lineNumbers: true
  },
  
  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/artisjs' },
      //{ icon: 'discord', link: 'https://chat.artisjs.dev' },
      { icon: 'github', link: 'https://github.com/artis-tool' }
    ],

    footer: {
      copyright: `Copyright © 2022-present Louis Low & Artis.js Contributors. MIT License. (${commitRef}).`
    },
   
  }
})
