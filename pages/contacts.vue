<template>
  <div class="d-flex fill-height">
    <v-container grid-list-lg class="align-center d-flex">
      <v-row class="py-12">
        <v-col v-if="showContacts" cols="12" md="6">
          <h1 class="text-h4 mb-9">Контакты</h1>
          <div
            v-for="(contact, i) in contacts"
            :key="`contact-${i}`"
            class="mb-6 fs-1-3 d-flex align-center"
          >
            <a
              v-if="contact.href"
              :href="contact.href"
              class="link font-weight-medium d-inline-flex align-center"
            >
              <v-icon class="mr-3">{{ contact.icon }}</v-icon>
              {{ contact.text }}
            </a>
            <div v-else class="font-weight-medium d-inline-flex align-center">
              <v-icon class="mr-3">{{ contact.icon }}</v-icon>
              {{ contact.text }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" :md="showContacts ? 6 : 12">
          <!-- md="6" -->
          <h2 class="mb-9 text-h4" :class="!showContacts && 'text-center'">
            Свяжитесь с нами
          </h2>
          <contact-form
            :class="!showContacts && 'ma-auto'"
            style="max-width: 450px"
            :dark="false"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- <div>
      <v-container grid-list-lg>
        <v-layout row wrap class="py-12"> -->

    <!-- </v-layout>
      </v-container>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.link a,
.link,
.link i {
  color: rgba(255, 255, 255, 0.87) !important;
}
.link {
  color: rgba(255, 255, 255, 0.87) !important;
  &:hover {
    color: #005aee !important;
    i {
      color: #005aee !important;
    }
  }
}
a {
  text-decoration: none;
}
</style>
<script>
import ContactForm from "~/components/ContactForm";

export default {
  head() {
    return {
      title: "Контакты",
    };
  },
  components: { ContactForm },
  computed: {
    showContacts() {
      // if (!this.$store.state.info) {
      //   return false;
      // }
      // console.log(
      //   "🚀 ~ file: contacts.vue ~ line 79 ~ showContacts ~ this.$store.state.info",
      //   this.$store.state.info
      // );

      return this.$store.state.info.showContacts;
    },
    contacts() {
      const contacts = this.$store.state.info;

      const contactsArr = [];
      if (contacts) {
        contactsArr.push(
          {
            icon: "phone",
            href: `tel:${contacts.phone}`,
            text: contacts.phone,
          },
          {
            icon: "mail",
            href: `mailto:${contacts.mail}`,
            text: contacts.mail,
          }
          //   {
          //     icon: "access_time",
          //     href: ``,
          //     text: contacts.accessTime
          //   }
        );
      }
      return contactsArr;
    },
  },
};
</script>