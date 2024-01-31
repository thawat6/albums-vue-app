<template>
  <div>
    <v-container fluid>
      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search Photo"
            ></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.title"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-card-title
                      class="d-inline-block text-truncate"
                      style="max-width: 200px"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ item.title }}
                    </v-card-title>
                  </template>
                  <span> {{ item.title }}</span></v-tooltip
                >

                <v-divider></v-divider>
                <v-dialog
                  transition="dialog-bottom-transition"
                  max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                      v-if="item.thumbnailUrl"
                      :src="item.thumbnailUrl"
                      :lazy-src="item.thumbnailUrl"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      max-width="300"
                      style="background-image: none"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </template>
                  <template v-slot:default="">
                    <v-card class="pa-0">
                      <v-card-text class="pa-0">
                        <v-img
                          v-if="item.url"
                          :src="item.url"
                          :lazy-src="item.url"
                          style="background-image: none"
                        >
                        </v-img>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-dialog>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "id",
      keys: ["Title"],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "title");
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>

<style>
</style>