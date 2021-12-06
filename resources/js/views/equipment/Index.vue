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
        :items="equipmentsData"
        sort-by="id"
        round
        flat
        v-show="!skeletonLoader"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>equipment</v-toolbar-title>
            <v-divider
              class="mx-4 clickable"
              inset
              vertical
            ></v-divider>
            <v-text-field
              rounded
              outlined
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              @input="searchEquipment"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              dark
              class="mb-2 clickable"
              @click="createEquipment"
            >
              New Equipment
            </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this Equipment?</v-card-title>
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
        { text: 'quantity', value: 'quantity', align: 'start', sortable: true },
        { text: 'is_expire', value: 'is_expire', align: 'start', sortable: true },
        { text: 'expire_date', value: 'expire_date', align: 'start', sortable: true },
        { text: 'unit_id', value: 'unit_id', align: 'start', sortable: true },
        { text: 'is_active', value: 'is_active', align: 'start', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      equipmentsData: [],
      search: '',
      skeletonLoader: false
    }),
    computed: {
      ...mapGetters("Equipment", ["equipments"])
    },
    methods: {
      ...mapActions("Equipment", ["index"]),
      initialize () {
        this.index()
        .then(() => {
          this.equipmentsData = this.equipments

          this.skeletonLoader = false
        })
      },
      createEquipment () {
        this.$router.push(`/equipment/create`)
      },
      deleteItem () {
        this.dialog = true
      },
      editItem (item) {
        this.$router.push(`/equipment/${item.id}/edit`)
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
      searchEquipment(){
        if(this.search === ''){
          this.initialize()

          this.search = ''
        }else{
          this.equipmentsData = this.equipmentsData.filter( equipment => equipment.name.toUpperCase().includes(this.search.toUpperCase()))
        }
      }
    },
    created(){
      this.skeletonLoader = true

      this.initialize()
    }
  }
</script>