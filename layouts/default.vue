<template>
  <v-app dark height="64px">
    <v-navigation-drawer v-model="drawer" app right touchless temporary>
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
    <v-app-bar fixed app class="py-0">
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
          <v-img
            :src="require('~/assets/logo.jpg')"
            contain
            height="52px"
            width="52px"
            max-width="52px"
            class="mr-auto"
          ></v-img>
          <span class="pl-3 logo-text" style=""
            >Я гопник, - я вообще мало читал!
          </span>
        </nuxt-link>

        <v-btn
          class="hidden-md-and-down"
          to="/about"
          text
          tile
          style="height: 100%"
          >О проекте</v-btn
        >
        <v-btn
          class="hidden-md-and-down"
          to="/contacts"
          text
          tile
          style="height: 100%"
          >Контакты</v-btn
        >
        <v-app-bar-nav-icon
          class="hidden-lg-and-up"
          @click.stop="drawer = !drawer"
        />
      </v-container>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer absolute app>
      <v-container grid-list-lg>
        <span
          >&copy; {{ new Date().getFullYear() }} Лучшая реклама для вас.</span
        >
      </v-container>
    </v-footer>
  </v-app>
</template>
<style lang="scss">
.logo-wrapper {
  // max-width: 300px;
  .logo-text {
    font-size: 1.2rem;
    line-height: normal;
  }
}

@media (min-width: 600px) {
  .logo-wrapper {
    // max-width: 400px;
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
export default {
  data() {
    return {
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
  computed: {
    info() {
      return this.$store.state.info;
    },
  },
};
</script>
