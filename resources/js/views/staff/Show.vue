<template>
    <v-card
        elevation="4"
    >
        <v-card-text>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    name
                </v-col>
                <v-col class="my-auto" cols="6" v-text="staffData.name"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    phone
                </v-col>
                <v-col class="my-auto" cols="6" v-text="staffData.phone"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    password
                </v-col>
                <v-col class="my-auto" cols="6" v-text="staffData.password"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    is_active
                </v-col>
                <v-col class="my-auto" cols="6" v-text="staffData.is_active"></v-col>
            </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data: () => ({
        loader: false,
        staffData: {
            name: null,
            phone: null,
            password: null,
            is_active: false,
        },
    }),
    computed: {
        ...mapGetters("Staff", ["staff"]),
    },
    methods: {
        ...mapActions("Staff", ["show", "delete"]),
        submit: function () {
            this.loader = true

            this.delete(this.staffData.id)
            .then(() => {
                this.loader = false

                this.$router.push('/staff')
            })
            .catch(err => console.log(err))
        },
    },
    created(){
        this.show(this.$route.params.id)
        .then(res => {
            this.staffData = this.staff
        })
    }
  }
</script>