<template>
    <v-card
        elevation="4"
    >
        <v-card-text>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    department_id
                </v-col>
                <v-col class="my-auto" cols="6" v-text="doctorData.department_id"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    name
                </v-col>
                <v-col class="my-auto" cols="6" v-text="doctorData.name"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    phone
                </v-col>
                <v-col class="my-auto" cols="6" v-text="doctorData.phone"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    password
                </v-col>
                <v-col class="my-auto" cols="6" v-text="doctorData.password"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    is_active
                </v-col>
                <v-col class="my-auto" cols="6" v-text="doctorData.is_active"></v-col>
            </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data: () => ({
        loader: false,
        doctorData: {
            name: null,
            phone: null,
            password: null,
            is_active: false,
        },
    }),
    computed: {
        ...mapGetters("Doctor", ["doctor"]),
    },
    methods: {
        ...mapActions("Doctor", ["show", "delete"]),
        submit: function () {
            this.loader = true

            this.delete(this.doctorData.id)
            .then(() => {
                this.loader = false

                this.$router.push('/doctors')
            })
            .catch(err => console.log(err))
        },
    },
    created(){
        this.show(this.$route.params.id)
        .then(res => {
            this.doctorData = this.doctor
        })
    }
  }
</script>