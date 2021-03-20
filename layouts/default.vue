<template>
  <v-app height="64px">
    <v-navigation-drawer v-model="drawer" dark app right touchless temporary>
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app dark class="py-0">
      <v-container
        fill-height
        class="py-0 d-flex align-center"
        style="flex-wrap: nowrap"
      >
        <nuxt-link
          to="/"
          class="logo-wrapper d-inline-flex align-center mr-auto"
          style="text-decoration: none; color: white"
        >
          <!-- {{ info }} -->
          <v-img
            :src="
              (info.logo && info.logo.url && $config.baseURL + info.logo.url) ||
              require('~/assets/logo.png')
            "
            contain
            height="52px"
            width="52px"
            max-width="52px"
            class="mr-auto"
          ></v-img>
          <span class="logo-text" style="">{{ info.name }} </span>
        </nuxt-link>

        <v-btn
          class="hidden-md-and-down"
          to="/about"
          text
          tile
          style="height: 100%"
        >
          О проекте
        </v-btn>
        <v-btn
          class="hidden-md-and-down"
          to="/contacts"
          text
          tile
          style="height: 100%"
        >
          Контакты
        </v-btn>

        <v-btn class="hidden-lg-and-up" icon @click.stop="drawer = !drawer">
          <MenuIcon style="width: 24px; height: 24px" />
          <!-- <div v-html="menuIcon"></div> -->
          <!-- <img :srqc="require('~/assets/menu.svg?include')" alt="" /> -->
        </v-btn>
        <!-- <v-app-bar-nav-icon
          dark
          class="hidden-lg-and-up"
          
        /> -->
      </v-container>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer absolute app dark>
      <v-container grid-list-lg>
        <span style="font-size: 12px">
          &copy; {{ new Date().getFullYear() }} {{ info.footerText }}
        </span>
      </v-container>
    </v-footer>
  </v-app>
</template>
<style lang="scss">
.logo-wrapper {
  // max-width: 300px;
  .logo-text {
    font-size: 1rem;
    line-height: normal;
    padding-left: 6px;
  }
}

@media (min-width: 600px) {
  .logo-wrapper {
    // max-width: 400px;
    .logo-text {
      font-size: 1.2rem;

      padding-left: 10px;
    }
  }
}

@media (min-width: 960px) {
  .logo-wrapper {
    // max-width: unset;
    .logo-text {
      font-size: 1.5rem;
    }
  }
}
</style>
<script>
import Menu from "~/assets/menu.svg?inline";
export default {
  data() {
    return {
      // menuIcon,
      // clipped: false,
      drawer: false,
      // fixed: false,1
      menuItems: [
        {
          icon: "mdi-apps",
          title: "О проекте",
          to: "/about",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Контакты",
          to: "/contacts",
        },
      ],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      // title: "Vuetify.js",
    };
  },
  components: { MenuIcon: Menu },
  computed: {
    info() {
      return this.$store.state.info;
    },
  },
};
</script>
