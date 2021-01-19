<template>
  <v-container grid-list-lg class="py-12">
    <v-row>
      <v-col cols="12">
        <h1 class="mb-8">О проекте</h1>
        <div v-html="page.about"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import gql from "graphql-tag";

export default {
  async asyncData(ctx) {
    const client = ctx.app.apolloProvider.defaultClient;
    const { data } = await client.query({
      query: gql`
        query AboutQuery {
          info {
            about
          }
        }
      `,
    });
    if (!data.info) {
      return ctx.error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }
    return {
      page: data.info,
    };
  },
  head() {
    return {
      title: "О проекте",
    };
  },
};
</script>