<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <a
        v-bind="attrs"
        v-on="on"
        :href="item.link"
        target="_blanc"
        class="grid-item"
        v-bind:style="styles"
      >
        <img class="grid-item-img" :src="item.img.url" :alt="item.name" />
      </a>
    </template>
    <span>{{ item.name }}</span>
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
  computed: {
    styles() {
      return {
        "grid-column-start": this.item.coords.startX,
        "grid-column-end": this.item.coords.endX,
        "grid-row-start": this.item.coords.startY,
        "grid-row-end": this.item.coords.endY,
      };
    },
  },
};
</script>