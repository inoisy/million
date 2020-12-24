<template>
  <v-row justify="center" align="center" class="py-12">
    <!-- {{ cursorX }} -->
    <!-- {{ showPoint }} -->
    <v-dialog v-model="dialog" width="600" :value="true">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template> -->

      <v-card class="px-12 py-12" light>
        <p class="display-1 font-weight-bold text-center mb-6">
          Забронируйте место
        </p>
        <contact-form />
        <!-- <v-card-title class="grey lighten-2"> Privacy Policy </v-card-title> -->

        <!-- <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
    <!-- <v-tooltip :value="true" top absolute
      ><span>Место свободно</span><br />
      Забронировать?
    </v-tooltip>  @mouseout="showPoint = false"-->
    <div class="grid-container" style="position: relative">
      <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0">
        <canvas
          @mousemove="handleMove"
          @mouseover="handleOver"
          @mouseout="handleOut"
          id="canv"
          width="1000"
          height="1000"
          style="display: block; width: 1000px; height: 1000px"
          >Ваш браузер устарел, обновитесь.</canvas
        >
      </div>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <a
            v-bind="attrs"
            v-on="on"
            href="http://mmk-soap.ru/"
            target="_blanc"
            class="grid-item"
            style="z-index: 2"
          >
            <img class="grid-item-img" src="@/assets/llogo.png" alt="" />
          </a>
        </template>
        <span>Мыловаренный Комбинат</span>
      </v-tooltip>

      <div
        v-show="showPoint"
        id="select-point"
        v-bind:style="pointStyles"
        @mouseover="handleCursorOver"
        @mouseout="handleCursorOut"
        @click="dialog = true"
      >
        <div class="tooltip" style="" v-show="showTooltip">
          <span>Место свободно</span><br />
          Забронировать?
        </div>
      </div>

      <!--  :style="`background-color: red; grid-row-start: ${cursorY};
          grid-column-start: ${cursorX};
          grid-row-end: ${cursorY + 1};
          grid-column-end: ${cursorX + 1};`"
          <template v-for="(item, index) in new Array(9999)">
        <div
          :key="index"
          class="item-hoverable"
          @mouseover="handleHover"
          @mouseleave="handleLeave"
        ></div>
      </template> -->
    </div>
    <!-- <v-col cols="12" sm="8" md="6">
     </v-col> -->
  </v-row>
</template>
<style lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(100, 10px [col-start]);
  grid-template-rows: repeat(100, 10px [col-start]);
  grid-auto-flow: dense;
  // background-color: gray;
}
.grid-item {
  background-color: white;
  display: flex;
  width: 100%;
  height: 100%;

  grid-column-start: 4;
  grid-column-end: 51;

  grid-row-start: 3;
  grid-row-end: 16;
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
  background-color: red;
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
// import Logo from "~/components/Logo.vue";
// import VuetifyLogo from "~/components/VuetifyLogo.vue";
function round10(val) {
  return Math.round(val / 10) * 10;
}
export default {
  data() {
    return {
      cursorX: 20,
      cursorY: 20,
      showTooltip: false,
      cursorHover: false,
      showPoint: false,
      dialog: false,
    };
  },
  components: {
    ContactForm,
    // Logo,
    // VuetifyLogo,
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

      el.addEventListener("mouseup", function (e) {
        // is_mouse_down = false;
      });

      el.addEventListener("mousemove", (e) => {
        // console.log(
        //   "🚀 ~ file: index.vue ~ line 184 ~ el.addEventListener ~ e.offsetX",
        //   round10(e.offsetX)
        // );
        // console.log(
        //   "🚀 ~ file: index.vue ~ line 186 ~ el.addEventListener ~ e.offsetY",
        //   round10(e.offsetY)
        // );
        // this.drawCell(round10(e.offsetX), round10(e.offsetY), 10, 10);
        // ctx.beginPath();
        // const w = canv.width;
        // const h = canv.height;
        // const p = w / pixel;
        // const xStep = w / p;
        // const yStep = h / p;
        // const vector = [];
        // let __draw = [];
        // for (let x = 0; x < w; x += xStep) {
        //   console.log(
        //     "🚀 ~ file: index.vue ~ line 184 ~ el.addEventListener ~ x",
        //     x
        //   );
        //   for (let y = 0; y < h; y += yStep) {
        //     console.log(
        //       "🚀 ~ file: index.vue ~ line 185 ~ el.addEventListener ~ y",
        //       y
        //     );
        //   }
        // }
        // if (is_mouse_down) {
        //   ctx.fillStyle = "red";
        //   ctx.strokeStyle = "red";
        //   ctx.lineWidth = pixel;
        //   ctx.lineTo(e.offsetX, e.offsetY);
        //   ctx.stroke();
        //   ctx.beginPath();
        //   ctx.arc(e.offsetX, e.offsetY, pixel / 2, 0, Math.PI * 2);
        //   console.log("e.offsetX", e.offsetX);
        //   console.log("e.offsetY", e.offsetY);
        //   ctx.fill();
        //   ctx.beginPath();
        //   ctx.moveTo(e.offsetX, e.offsetY);
        // }
      });
    }

    let vector = [];
    let net = null;
    let train_data = [];

    const d = new DCanvas(document.getElementById("canv"));
    d.drawGrid();
    document.addEventListener("keypress", function (e) {
      if (e.key.toLowerCase() == "c") {
        d.clear();
      }

      if (e.key.toLowerCase() == "v") {
        vector = d.calculate(true);

        //train
        // if (confirm("Positive?")) {
        //   train_data.push({
        //     input: vector,
        //     output: { positive: 1 },
        //   });
        // } else {
        //   train_data.push({
        //     input: vector,
        //     output: { negative: 1 },
        //   });
        // }
      }

      if (e.key.toLowerCase() == "b") {
        net = new brain.NeuralNetwork();
        net.train(train_data, { log: true });

        const result = brain.likely(d.calculate(), net);
        alert(result);
      }
    });
  },
  computed: {
    pointStyles() {
      return {
        "grid-row-start": this.cursorY,
        "grid-column-start": this.cursorX,
        "grid-row-end": this.cursorY + 1,
        "grid-column-end": this.cursorX + 1,
      };
    },
  },
  methods: {
    handleCursorOut(e) {
      this.cursorHover = false;
      this.showTooltip = false;
    },
    handleCursorOver(e) {
      this.cursorHover = true;
      this.showTooltip = true;
    },
    handleOut(e) {
      if (!this.cursorHover) {
        this.showTooltip = false;
      }
      // this.showPoint = false;
    },
    handleMove(e) {
      this.cursorX = Math.floor(e.offsetX / 10) + 1;
      this.cursorY = Math.floor(e.offsetY / 10) + 1;
      console.log(" handleMove ", this.cursorX, this.cursorY);
    },
    handleOver() {
      this.showPoint = true;
    },
    handleLeave(e) {
      // console.log("🚀 ~  handleLeave");
      e.target.style.backgroundColor = "unset";
    },

    handleHover(e) {
      // console.log(
      //   "🚀 ~ file: index.vue ~ line 48 ~ handleHover ~ target",
      //   target
      // );
      e.target.style.backgroundColor = "blue";
      // console.log(
      //   "🚀 ~ file: index.vue ~ line 48 ~ handleHover ~ target",
      //   e.target
      // );
    },
  },
};
</script>
