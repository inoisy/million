<template>
  <div class="wrapper" ref="container">
    <!-- <v-dialog v-model="dialog" width="600" :value="true" hide-overlay>
      <v-card class="dialogInner" light>
        <h2 v-if="!succseed" class="dialogHeader">Забронируйте место</h2>
        <contact-form @success="formSucceed" />
      </v-card>
    </v-dialog> v-if="dialog"  -->
    <default-dialog />

    <div
      class="wrapper-inner mx-auto"
      v-resize="handleResize"
      :style="`padding-left: ${padding}px; padding-right: ${padding}px;`"
    >
      <div class="grid-container" :style="`transform: scale(${scale});`">
        <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0">
          <canvas
            @mousemove="handleMove"
            @mouseover="handleOver"
            @mouseout="handleOut"
            id="canv"
          >
            Ваш браузер устарел, обновитесь.
          </canvas>
        </div>
        <template v-for="(item, index) in items">
          <ad-item :item="item" :key="`ad-item${index}`" />
        </template>

        <div
          v-show="showPoint"
          id="select-point"
          v-bind:style="pointStyles"
          @mouseover="handleCursorOver"
          @mouseout="handleCursorOut"
          @click="handlePointClick"
        >
          <v-fade-transition>
            <!-- <transition name="fade"> -->
            <div class="tooltip" style="" v-show="showTooltip">
              <span>Место свободно</span><br />
              Забронировать?
            </div>
            <!-- </transition> -->
          </v-fade-transition>
        </div>
      </div>
    </div>
    <!-- </v-row>
    </v-container> -->
  </div>
</template>
<style lang="scss" >
body {
  transform: none !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.wrapper {
  height: 100%;
  max-height: calc(100vh - 60px);
  // background-color: #85bb65;
  padding: 70px 0px;
  // overflow-x: auto;

  // background: url(https://image.freepik.com/free-photo/abstract-urban-night-light-bokeh-defocused-background_1421-468.jpg);

  background: url(/bg1.jpg); // linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)),
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  /* justify-content: center; */
  overflow: hidden;
  .wrapper-inner {
    // max-width: 1000px;
    max-height: calc(100vw - 48px);

    display: flex;
    margin-bottom: -24px;
    // justify-content: center;
  }
}

@media (min-width: 600px) {
  .wrapper {
    max-height: 100%;
    .wrapper-inner {
      margin-bottom: 0;
    }
  }
}

@media (min-width: 960px) {
  .wrapper {
    .wrapper-inner {
      justify-content: center;
    }
  }
}

#canv {
  background-color: rgba(255, 255, 255, 0.7);
  display: block;
  width: 1000px;
  height: 1000px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(100, 10px [col-start]);
  grid-template-rows: repeat(100, 10px [col-start]);
  grid-auto-flow: dense;
  position: relative;
  // transform: scale(0.8);
  transform-origin: 0 0;
  // width: 100vw;
  // overflow-x: auto;
  // background-color: gray;
}

.grid-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px darkgray solid;
}
#select-point {
  z-index: 2;
  position: relative;
  background-color: #005aee;
  cursor: pointer;
}
.tooltip {
  background: rgba(97, 97, 97, 0.9);
  color: #ffffff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  display: inline-block;
  padding: 8px 16px;
  position: absolute;
  bottom: 15px;
  left: -70px;
  width: 150px;
  cursor: pointer;
}
.tooltip:after {
  position: absolute;
  bottom: -5px;
  left: 50%;
  margin-left: -5px;
  width: 0;
  border-top: 5px solid #000;
  border-top: 5px solid rgba(97, 97, 97, 0.9);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
}
</style>
<script>
import ContactForm from "~/components/ContactForm.vue";
import AdItem from "~/components/AdItem";
// import Logo from "~/components/Logo.vue";
// import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  head() {
    return {
      title: "BestAdvertisementForYou",
      titleTemplate: "",
    };
  },
  data() {
    return {
      cursorX: 20,
      cursorY: 20,
      showTooltip: false,
      cursorHover: false,
      showPoint: false,
      // dialogVal: false,

      scale: 1,
      // succseed: false,
    };
  },
  components: {
    ContactForm,
    AdItem,
  },
  mounted() {
    function DCanvas(el) {
      const ctx = el.getContext("2d");
      const pixel = 10;

      let is_mouse_down = false;

      canv.width = 1000;
      canv.height = 1000;

      this.drawLine = function (x1, y1, x2, y2, color = "gray") {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineJoin = "miter";
        ctx.lineWidth = 1;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };

      this.drawCell = function (x, y, w, h) {
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "blue";
        ctx.lineJoin = "miter";
        ctx.lineWidth = 1;
        ctx.rect(x, y, w, h);
        ctx.fill();
      };

      this.clear = function () {
        ctx.clearRect(0, 0, canv.width, canv.height);
      };

      this.drawGrid = function () {
        const w = canv.width;
        const h = canv.height;
        const p = w / pixel;

        const xStep = w / p;
        const yStep = h / p;

        for (let x = 0; x < w + xStep; x += xStep) {
          this.drawLine(x, 0, x, h);
        }

        for (let y = 0; y < h + yStep; y += yStep) {
          this.drawLine(0, y, w, y);
        }
      };

      this.calculate = function (draw = false) {
        const w = canv.width;
        const h = canv.height;
        const p = w / pixel;

        const xStep = w / p;
        const yStep = h / p;

        const vector = [];
        let __draw = [];

        for (let x = 0; x < w; x += xStep) {
          for (let y = 0; y < h; y += yStep) {
            const data = ctx.getImageData(x, y, xStep, yStep);

            let nonEmptyPixelsCount = 0;
            for (let i = 0; i < data.data.length; i += 10) {
              const isEmpty = data.data[i] === 0;

              if (!isEmpty) {
                nonEmptyPixelsCount += 1;
              }
            }

            if (nonEmptyPixelsCount > 1 && draw) {
              __draw.push([x, y, xStep, yStep]);
            }

            vector.push(nonEmptyPixelsCount > 1 ? 1 : 0);
          }
        }

        if (draw) {
          this.clear();
          this.drawGrid();

          for (let _d in __draw) {
            this.drawCell(
              __draw[_d][0],
              __draw[_d][1],
              __draw[_d][2],
              __draw[_d][3]
            );
          }
        }

        return vector;
      };

      el.addEventListener("mousedown", function (e) {
        is_mouse_down = true;
        // ctx.beginPath();
      });
    }

    let vector = [];
    let net = null;
    let train_data = [];

    const d = new DCanvas(document.getElementById("canv"));
    d.drawGrid();

    // const getRect = this.$refs.container.getBoundingClientRect();
    // console.log("🚀 ~ file: index.vue ~ line 304 ~ mounted ~ getRect", getRect);
    // const width = getRect.width;
    // console.log("width ", width);
    // console.log("width/100 ", width / (1000 + 48));
    // this.scale = width / (1000 + 48);

    this.handleResize();
  },
  computed: {
    dialog() {
      return this.$store.state.dialog.isShow;
    },

    items() {
      return this.$store.state.ads;
    },
    // dialog: {
    //   get() {
    //     return this.dialogVal;
    //   },
    //   set(val) {
    //     if (!val) {
    //       document.body.style = "";
    //     }
    //     // set does not return anything
    //     this.dialogVal = val;
    //   },
    // },

    pointStyles() {
      return {
        "grid-row-start": this.cursorY,
        "grid-column-start": this.cursorX,
        "grid-row-end": this.cursorY + 1,
        "grid-column-end": this.cursorX + 1,
      };
    },
    isMobile() {
      if (process.client) {
        const width = document.body.clientWidth;
        return width < 1000;
      } else {
        return true;
      }
    },
    padding() {
      return this.isMobile ? 12 : 24;
    },
  },
  methods: {
    // formSuccessful() {
    //   this.succseed = true;
    //   console.log("formSucceed");
    //   setTimeout(() => {
    //     // await this.close();
    //     this.dialogVal = false;
    //   }, 7000);
    // },
    handleCursorOut(e) {
      this.cursorHover = false;
      this.showTooltip = false;
    },
    handleCursorOver(e) {
      this.cursorHover = true;
      this.showTooltip = true;
    },

    handleMove(e) {
      this.cursorX = Math.floor(e.offsetX / 10) + 1;
      this.cursorY = Math.floor(e.offsetY / 10) + 1;
      // console.log(" handleMove ", this.cursorX, this.cursorY);
    },
    handleOver() {
      this.showPoint = true;
    },
    handleOut(e) {
      if (!this.cursorHover) {
        this.showTooltip = false;
      }
      // this.showPoint = false;
    },
    // isMobile() {
    //   return this.$vuetify.breakpoint.mdAndDown;
    // },
    handleResize() {
      // if (window.devicePixelRatio !== 1) {
      //   return;
      // }
      if (document.body.clientWidth < 1000 + this.padding * 2) {
        const getRect = this.$refs.container.getBoundingClientRect();
        const width = getRect.width;
        const scale = (width - this.padding * 2) / 1000;
        if (scale < 1) {
          this.scale = scale;
        } else {
          this.scale = 1;
        }
      } else {
        this.scale = 1;
      }
    },
    handlePointClick() {
      var scale = "scale(1)";
      // document.body.style.webkitTransform = scale; // Chrome, Opera, Safari
      // document.body.style.msTransform = scale; // IE 9
      document.body.style.transform = scale; // General
      // document.body.style.zoom = "100%";
      this.$store.dispatch("toggleDialog", {
        isShow: true,
        point: [this.cursorY, this.cursorX],
      });
      // this.dialog = true;
    },

    // handleLeave(e) {
    //   // console.log("🚀 ~  handleLeave");
    //   e.target.style.backgroundColor = "unset";
    // },

    // handleHover(e) {
    //   // console.log(
    //   //   "🚀 ~ file: index.vue ~ line 48 ~ handleHover ~ target",
    //   //   target
    //   // );
    //   e.target.style.backgroundColor = "blue";
    //   // console.log(
    //   //   "🚀 ~ file: index.vue ~ line 48 ~ handleHover ~ target",
    //   //   e.target
    //   // );
    // },
  },
};
</script>
