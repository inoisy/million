import colors from 'vuetify/es5/util/colors'

const baseURL = process.env.BASE_URL || 'https://api.bestadforyou.com'

const siteURL = process.env.SITE_URL || `https://bestadforyou.com`
// console.log("🚀 ~ file: nuxt.config.js ~ line 64 ~ baseURL + '/graphql'", baseURL + '/graphql')
// BASE_URL=https://api.bestadforyou.com

export default {
  // env: {
  //   baseUrl: baseURL
  // },
  publicRuntimeConfig: {
    baseURL: baseURL
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - BestAdvertisementForYou',
    title: 'BestAdvertisementForYou',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: "image/png", sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: "image/png", sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/styles/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "@nuxtjs/svg",
    // https://go.nuxtjs.dev/axios
    ['@nuxtjs/axios', {
      baseURL: baseURL,
    }],
    ['@nuxtjs/apollo', {
      // watchLoading: '~/plugins/apollo-watch-loading-handler.js',
      // optional
      // errorHandler: '~/plugins/apollo-error-handler.js',
      clientConfigs: {
        default: {
          httpEndpoint: baseURL + '/graphql',
        },
      }
    }],
    ['nuxt-social-meta', {
      url: siteURL,
      title: "BestAdForYou - Рекламная площадка",
      // description: description,
      // img: imageUrl + "/uploads/031ba5905e18488794851c8d512b1227.jpg",
      locale: 'ru_RU',
      // themeColor: '#d50000'
    }],
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Allow: '/',
      Sitemap: siteURL + "/sitemap.xml"
    }],
    ['@nuxtjs/sitemap', {
      hostname: siteURL,
      gzip: true,
      // routes
    }],
    ['@nuxtjs/yandex-metrika',
      {
        id: process.env.YANDEX_ID,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      }],
  ],
  styleResources: {
    // your settings here
    sass: [],
    scss: [
      './assets/styles/_mixins/*.scss',
      './assets/styles/_vars/*.scss',
    ],
    less: [],
    stylus: []
  },
  // webfontloader: {
  //   google: {
  //     families: ['Montserrat:100,300,400,500,700,900'] //Loads Lato font with weights 400 and 700
  //   },
  //   urls: [
  //     // for each Google Fonts add url + options you want
  //     // here add font-display option
  //     'https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,700,900&display=swap',
  //   ]
  // },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  // axios: ,

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    options: {
      customProperties: true
    },
    defaultAssets: false,
    optionsPath: './vuetify.options.js'
    // treeShake: true,
    // defaultAssets: {
    //   font: {
    //     family: 'Montserrat'
    //   },
    //   icons: "md"
    // },
    // options: {
    //   customProperties: true
    // },
    // customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      sourceType: 'unambiguous',
      presets: [
        ["@nuxt/babel-preset-app", {
          corejs: {
            version: 2
          }
        }],
      ]
    },
    transpile: ["@nuxtjs/vuetify", /^aos/, /^@nuxtjs.*/, "nuxt-vuex-localstorage"],
    extend(config, ctx) { }
  }
}
