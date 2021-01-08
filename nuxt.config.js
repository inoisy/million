import colors from 'vuetify/es5/util/colors'

const baseURL = process.env.BASE_URL || 'http://localhost:1337'
export default {
  // env: {
  //   baseUrl: baseURL
  // },
  publicRuntimeConfig: {
    baseURL: baseURL
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - million',
    title: 'million',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // 'nuxt-webfontloader',
    // ['@nuxtjs/vuetify', {
    //   treeShake: true,
    //   defaultAssets: {
    //     font: {
    //       family: 'Montserrat'
    //     },
    //     icons: "md"
    //   },
    //   customVariables: ['~/assets/variables.scss'],
    //   options: {
    //     customProperties: true
    //   },
    //   theme: {
    //     dark: true,
    //     themes: {
    //       dark: {
    //         primary: colors.blue.darken2,
    //         accent: colors.grey.darken3,
    //         secondary: colors.amber.darken3,
    //         info: colors.teal.lighten1,
    //         warning: colors.amber.base,
    //         error: colors.deepOrange.accent4,
    //         success: colors.green.accent3
    //       }
    //     }
    //   }
    // }
    // ],
  ],
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
  axios: {
    baseURL: baseURL,
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Montserrat'
      },
      icons: "md"
    },
    options: {
      customProperties: true
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
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
