<template>
  <v-card flat>
    <v-card-text
    class="pa-16"
      v-if="skeletonLoader"
    >
      <v-skeleton-loader
        type="table"
      ></v-skeleton-loader>
    </v-card-text>
    <v-card-text v-if="!skeletonLoader" class="pa-16">
      <v-data-table
        :headers="headers"
        :items="departmentsData"
        sort-by="id"
        round
        flat
        v-show="!skeletonLoader"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>departments</v-toolbar-title>
            <v-divider
              class="mx-4 clickable"
              inset
              vertical
            ></v-divider>
            <v-text-field
              rounded
              outlined
              dense
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              @input="searchDepartment"
            ></v-text-field>
            <v-divider
              class="mx-4 clickable"
              inset
              vertical
            ></v-divider>
            <v-btn
              dark
              class="clickable"
              @click="createDepartment"
            >
              New Department
            </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this Department?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete" class="clickable">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm" class="clickable">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2 clickable"
            @click="editItem(item)"
            color="primary"
          >
            fa-edit
          </v-icon>
          <v-icon
            class="clickable"
            color="red"
            small
            @click="deleteItem(item)"
          >
            fa-trash
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
            class="clickable"
          >
            Load Data
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'name', value: 'name', align: 'start', sortable: true },
        { text: 'is_active', value: 'is_active', align: 'start', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      departmentsData: [],
      search: '',
      skeletonLoader: false
    }),
    computed: {
      ...mapGetters("Department", ["departments"])
    },
    methods: {
      ...mapActions("Department", ["index"]),
      initialize () {
        this.index()
        .then(() => {
          this.departmentsData = this.departments

          this.skeletonLoader = false
        })
      },
      createDepartment () {
        this.$router.push(`/departments/create`)
      },
      deleteItem () {
        this.dialog = true
      },
      editItem (item) {
        this.$router.push(`/departments/${item.id}/edit`)
      },
      closeDelete () {
        this.dialog = false
        
        setTimeout(() => this.skeletonLoader = false, 200)
      },
      deleteItemConfirm (item) {
        this.deleteCategories(item.id)
        .then(() => this.closeDelete())
        .catch((error) => console.log(error))
      },
      searchDepartment(){
        if(this.search === ''){
          this.initialize()

          this.search = ''
        }else{
          this.departmentsData = this.departmentsData.filter( department => department.name.toUpperCase().includes(this.search.toUpperCase()))
        }
      }
    },
    created(){
      this.skeletonLoader = true

      this.initialize()
    }
  }
</script>