<template>
    <v-card
        elevation="4"
    >
        <v-card-text>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    name
                </v-col>
                <v-col class="my-auto" cols="6" v-text="managerData.name"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    email
                </v-col>
                <v-col class="my-auto" cols="6" v-text="managerData.email"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    password
                </v-col>
                <v-col class="my-auto" cols="6" v-text="managerData.password"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    is_active
                </v-col>
                <v-col class="my-auto" cols="6" v-text="managerData.is_active"></v-col>
            </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data: () => ({
        loader: false,
        managerData: {
            name: null,
            phone: null,
            email: null,
            password: null,
            is_active: false,
        },
    }),
    computed: {
        ...mapGetters("Manager", ["manager"]),
    },
    methods: {
        ...mapActions("Manager", ["show", "delete"]),
        submit: function () {
            this.loader = true

            this.delete(this.managerData.id)
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
            this.managerData = this.manager
        })
    }
  }
</script>