import {defineConfig} from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'concise-ms',
  description: 'understandable milliseconds',

  lastUpdated: true,

  head:[
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
  ],

  themeConfig: {
    logo:'/logo.svg',
    // nav:nav(),
    // sidebar:sidebar(),

    editLink:{
      pattern:'https://github.com/elonehoo/concise-ms/edit/main/docs/:path',
      text:'Edit this page'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/elonehoo/concise-ms' },
      {icon: 'twitter', link: 'https://twitter.com/huchengye'},
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Elone Hoo'
    },
  }
})

function nav(){
  return [
    { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
    { text: 'app', link: '/app/', activeMatch: '/app/' },
    { text: 'web', link: '/web/', activeMatch: '/web/' },
  ]
}

function sidebar(){
  return {
    '/':[
      {
        text: 'Guide',
        items:[
          {text:'Why lair',link: '/guide/why'},
          {text:'Getting Started',link: '/guide/getting-started'},
          {text:'Features',link: '/guide/features'},
        ]
      },
      {
        text:'App',
        items:[
          {text:'Introduce',link:'/app/'},
        ]
      },
      {
        text:'Web',
        items:[
          {text:'Introduce',link:'/web/'},
        ]
      },
    ]
  }

}
