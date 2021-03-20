<template>
  <patched-dialog
    v-model="isShow"
    width="600"
    :value="true"
    content-class="dialog-content"
  >
    <!-- @after-leave="afterTransition"  -->
    <v-card class="dialogInner" light>
      <!-- <template v-if="!formSuccess"> -->

      <contact-form>
        <h2 class="dialogHeader">Забронируйте место</h2>
      </contact-form>
      <!--@success="formSuccessful" </template> -->
      <!-- -if="isShow" -->
      <!-- <v-fade-transition v-else>
        <div>
          <div
            style="
              width: 230px;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 2rem;
              margin-top: 2rem;
            "
          >
             <Checked />
          </div>
          <div
            style="font-size: 2rem; font-weight: 900"
            class="mb-3 text-center"
          >
            Заявка отправлена!
          </div>
          <div style="font-size: 20px" class="text-center text-title mb-3">
            Мы свяжемся с вами в ближайшее время.
          </div>
        </div>
      </v-fade-transition> -->
    </v-card>
  </patched-dialog>
</template>

<script>
// import { VDialog as VDialogOriginal } from "vuetify/lib";

// /**
//  * Hack to patch VDialog because it has no way to set transition hooks
//  */
// function patchVDialog(VDialog) {
//   const ExtendedVDialog = VDialog.extend({});
//   const originalRender = ExtendedVDialog.prototype.constructor.options.render;

//   ExtendedVDialog.prototype.constructor.options.render = function (h) {
//     const originalH = h;
//     h = (...args) => {
//     console.log("🚀 ~ file: DefaultDialog.vue ~ line 57 ~ patchVDialog ~ args", args)
//       // Check for the call to render a transition,
//       // there is only one rendered transition in VDialog
//       if (args[0] === "transition") {
//         // Forward the user provided listeners to the transition component
//         args[1].on = this.$listeners;
//         console.log("🚀 ~ file: DefaultDialog.vue ~ line 62 ~ patchVDialog ~ this.$listeners", this.$listeners)
//       }

//       return originalH(...args);
//     };
//     return originalRender.call(this, h);
//   };

//   return ExtendedVDialog;
// }
// VDialogPatched:patchVDialog(VDialogOriginal)

// import Checked from "~/assets/checked.svg?inline";
// const VDialogPatched = ;
export default {
  //   components: { Checked },
  data() {
    return {
      dialogVal: false,
      formSuccess: false,
      showForm: true,
    };
  },
  //   watch: {
  //     isShow(val) {
  //       console.log(
  //         "🚀 ~ file: DefaultDialog.vue ~ line 52 ~ isShow ~ isShow",
  //         val
  //       );
  //     },
  //   },
  methods: {
    // afterTransition() {
    //   console.log("afterTransition");
    // },
    async close() {
      this.formSuccess = false;
      this.formError = false;
      //   this.
      await this.$store.dispatch("toggleDialog", {
        point: null,
        isShow: false,
      });
    },
    // formSuccessful() {
    //   this.formSuccess = true;
    //   console.log("formSucceed");
    //   setTimeout(async () => {
    //     await this.close();
    //     // this.dialogVal = false;
    //   }, 7000);
    // },
  },
  //   afterDestroy() {
  //     console.log("🚀 ~ file: DefaultDialog.vue ~ line 38 ~ afterDestroy ~ afterDestroy")
  //     this.close();
  //   },
  computed: {
    productName() {
      return this.$store.state.dialog.name;
    },
    isShow: {
      get() {
        const val = this.$store.state.dialog.isShow;
        if (val) {
          this.showForm = true;
        }
        return val;
      },
      async set(val) {
        if (!val) {
          await this.close();
        }
      },
    },
  },
};
</script>
<style lang="scss">
.dialog-content {
  margin-top: 88px !important;
}
</style>
<style scoped lang="scss">
.dialogInner {
  padding: 18px;
  padding-top: 28px;
  @include sm {
    padding: 36px;
  }
  .dialogHeader {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    line-height: 125%;
    margin-bottom: 22px;
    @include sm {
      font-size: 2rem;
    }
  }
  // padding-top:48px;
  // padding-bottom: 48px;
  // padding-left: 36px;
  // padding-right: 36px;
}
/* .v-dialog__content {
  height: calc(100vh - 64px);
  padding-top: 64px;
} */
</style>