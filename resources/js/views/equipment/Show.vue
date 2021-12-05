<template>
    <v-card
        elevation="4"
    >
        <v-card-text>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    name
                </v-col>
                <v-col class="my-auto" cols="6" v-text="equipmentData.name"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    quantity
                </v-col>
                <v-col class="my-auto" cols="6" v-text="equipmentData.quantity"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    is_expire
                </v-col>
                <v-col class="my-auto" cols="6" v-text="equipmentData.is_expire"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    expire_date
                </v-col>
                <v-col class="my-auto" cols="6" v-text="equipmentData.expire_date"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    unit_id
                </v-col>
                <v-col class="my-auto" cols="6" v-text="equipmentData.unit_id"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    is_active
                </v-col>
                <v-col class="my-auto" cols="6" v-text="equipmentData.is_active"></v-col>
            </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data: () => ({
        loader: false,
        equipmentData: {
            name: null,
            quantity: null,
            is_expire: false,
            expire_date: null,
            unit_id: null,
            is_active: false,
        },
    }),
    computed: {
        ...mapGetters("Equipment", ["equipment"]),
    },
    methods: {
        ...mapActions("Equipment", ["show", "delete"]),
        submit: function () {
            this.loader = true

            this.delete(this.equipmentData.id)
            .then(() => {
                this.loader = false

                this.$router.push('/units')
            })
            .catch(err => console.log(err))
        },
    },
    created(){
        this.show(this.$route.params.id)
        .then(res => {
            this.equipmentData = this.equipment
        })
    }
  }
</script>