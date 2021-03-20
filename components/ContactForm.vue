<template>
  <div v-if="formSuccess">
    <!--  -->

    <div
      style="
        width: 230px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2rem;
        margin-top: 2rem;
      "
    >
      <!-- v-html="require(`~/assets/images/checked.svg?include`)" -->
      <Checked />
    </div>
    <div style="font-size: 2rem; font-weight: 900" class="mb-3 text-center">
      Заявка отправлена!
    </div>
    <div style="font-size: 20px" class="text-center text-title mb-3">
      Мы свяжемся с вами в ближайшее время.
    </div>
  </div>
  <v-form v-else class="layout wrap">
    <slot></slot>
    <!-- <template> -->
    <!-- v-if="!this.formSuccess && !this.formError" -->
    <v-text-field
      v-model="name"
      class="xs12 py-0 flex"
      :error-messages="nameErrors"
      :dark="!dark"
      label="Ваше имя*"
      required
      autofocus
      outlined
      dense
      @blur="$v.name.$touch()"
    />
    <v-text-field
      v-model="companyName"
      :error-messages="companyNameErrors"
      class="xs12 py-0 flex"
      :dark="!dark"
      required
      outlined
      dense
      label="Название компании*"
    />
    <v-text-field
      class="xs12 py-0 flex"
      v-model="phone"
      :dark="!dark"
      :error-messages="phoneErrors"
      v-mask="mask"
      label="Телефон*"
      required
      outlined
      dense
      @blur="$v.phone.$touch()"
    />
    <v-text-field
      v-model="email"
      class="xs12 py-0 flex"
      :dark="!dark"
      label="E-mail"
      outlined
      dense
      @blur="$v.email.$touch()"
      :error-messages="emailErrors"
    />
    <!-- <v-text-field
      class="xs12 py-0 flex"
      outlined
      dense
      v-model="address"
      label="Адрес"
    ></v-text-field> -->
    <v-textarea
      v-model="message"
      class="xs12 py-0 flex"
      :dark="!dark"
      outlined
      dense
      height="100px"
      hide-details
      label="Комментарий"
    />
    <v-flex xs12>
      <v-btn
        class="ml-0 mt-6"
        :color="dark ? 'black' : 'white'"
        :dark="!dark"
        @click="submit"
        large
        :disabled="submitDisabled"
        :loading="loading"
        style="width: 100%"
        title="Подтвердить заказ"
      >
        Забронировать
      </v-btn>
      <!-- :disabled="submitDisabled" -->
    </v-flex>
    <!-- </template> -->
    <v-slide-y-transition>
      <v-flex xs12 v-if="this.formError">
        <!-- this.formSuccess ||  -->
        <!-- <v-alert
          :value="this.formSuccess"
          class="flex xs12 mt-3"
          type="success"
        >
          Заказ успешно отправлен.
        </v-alert> -->
        <v-alert
          color="#F44336"
          :value="this.formError"
          class="flex xs12 mt-3"
          type="error"
        >
          Ошибка при отправке.
          <template #prepend>
            <Warning class="mr-3" />
          </template>
        </v-alert>
      </v-flex>
    </v-slide-y-transition>
  </v-form>
</template>
<style lang="scss" scoped>
.theme--dark.v-btn {
  color: $black;
}
.theme--light.v-btn {
  color: $white;
}
</style>

<script>
import Checked from "~/assets/checked.svg?inline";
import Warning from "~/assets/warning.svg?inline";

import gql from "graphql-tag";

import { validationMixin } from "vuelidate";
import { mask } from "vue-the-mask";

import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
export default {
  components: { Checked, Warning },
  props: {
    productName: {
      type: String,
      default: "",
    },
    dark: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [validationMixin],
  directives: {
    mask,
  },
  validations: {
    name: { required, maxLength: maxLength(35), minLength: minLength(3) },
    companyName: {
      required,
      maxLength: maxLength(65),
      minLength: minLength(3),
    },
    phone: { required, minLength: minLength(10), maxLength: maxLength(19) },
    email: { email },
  },
  data() {
    return {
      formSuccess: false,
      formError: false,
      name: "",
      phone: "",
      email: "",
      message: "",
      mask: "+7 (###) ### - ####",
      loading: false,
      companyName: "",
    };
  },
  afterDestroy() {
    // console.log("form afterDestroy");
    this.clear();
  },
  // mounted() {
  //   console.log("🚀 ~ file: ContactForm.vue ~ line 173 ~ mounted ~ mounted");
  // },
  methods: {
    clear() {
      this.$v.$reset();
      this.phone = "";
      this.name = "";
      this.message = "";
      //   this.address = "";
      this.email = "";
      this.formSuccess = false;
      this.formError = false;
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$anyError) return;
      this.loading = true;
      // console.log(this.$store.state.dialog.point);
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation(
              # $name: String!
              $phone: String!
              $message: String
              $email: String
              $companyName: String!
              $point: JSON
            ) {
              createOrder(
                input: {
                  data: {
                    name: $name
                    phone: $phone
                    message: $message
                    email: $email
                    companyName: $companyName
                    point: $point
                  }
                }
              ) {
                order {
                  id
                }
              }
            }
          `,
          variables: {
            name: this.name,
            phone: this.phone,
            message: this.message,
            email: this.email,
            companyName: this.companyName,
            point: this.$store.state.dialog.point,
            // name: this.name,
            // phone: this.phone,
            // message: this.message,
            // email: this.email,
            // serviceName: this.$store.state.dialog.name,
          },
        })
        .then(() => {
          this.formSuccess = true;
          // this.$emit("success");
          // this.clear();

          // if (
          //   this.$config.yandexMetrikaID &&
          //   window[`yaCounter${this.$config.yandexMetrikaID}`]
          // ) {
          //   console.log("order");
          //   window[`yaCounter${this.$config.yandexMetrikaID}`].reachGoal(
          //     "order"
          //   );
          // }
          // window[`yaCounter${this.$config.yandexMetrikaID}`]
        })
        .catch(() => {
          this.formError = true;
        });
      this.loading = false;
      // try {
      //   this.loading = true;
      //   const req = await this.$axios.post("/orders", {
      //     name: this.name,
      //     phone: this.phone,
      //     message: this.message,
      //     email: this.email,
      //     companyName: this.companyName,
      //   });
      //   this.loading = false;
      //   if (req.status === 200) {
      //     // this.$store.commit("saveBasket");

      //     this.formSuccess = true;
      //   } else {
      //     this.formError = true;
      //     this.loading = false;
      //   }
      // } catch (error) {
      //   this.loading = false;
      //   // console.log("submit -> error", error);
      //   this.formError = true;
      //   this.clear();
      // }
    },
  },
  computed: {
    submitDisabled() {
      return (
        !this.name || !this.phone || !this.companyName || this.$v.$anyError
      );
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push("Слишком длинное имя");
      !this.$v.name.minLength && errors.push("Слишком короткое имя");
      !this.$v.name.required && errors.push("Введите имя");
      return errors;
    },
    companyNameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.companyName.maxLength &&
        errors.push("Слишком длинное название компании");
      !this.$v.companyName.minLength &&
        errors.push("Слишком короткое название компании");
      !this.$v.companyName.required && errors.push("Введите название компании");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.maxLength && errors.push("Слишком длинный телефон");
      !this.$v.phone.minLength && errors.push("Слишком короткий телефон");
      !this.$v.phone.required && errors.push("Введите телефон");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Введите корректный email");
      return errors;
    },
  },
};
</script>