<template>
  <v-tooltip top v-if="item.img">
    <template v-slot:activator="{ on, attrs }">
      <a
        v-bind="attrs"
        v-on="on"
        :href="item.link"
        target="_blanc"
        class="grid-item"
        v-bind:style="styles"
      >
        <img
          class="grid-item-img"
          :src="$config.baseURL + item.img.url"
          :alt="item.companyName"
        />
      </a>
    </template>
    <span>{{ item.companyName }}</span>
  </v-tooltip>
</template>
<style lang="scss">
.grid-item {
  background-color: white;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 2;

  //   grid-column-start: 4;
  //   grid-column-end: 51;

  //   grid-row-start: 3;
  //   grid-row-end: 16;
}
</style>
<script>
export default {
  props: ["item"],
  // data() {
  //   return {
  //     baseUrl: this.$config.baseURL,
  //   };
  // },
  computed: {
    styles() {
      return {
        "grid-column-start": this.item.startX,
        "grid-column-end": this.item.endX,
        "grid-row-start": this.item.startY,
        "grid-row-end": this.item.endY,
      };
    },
  },
};
</script>