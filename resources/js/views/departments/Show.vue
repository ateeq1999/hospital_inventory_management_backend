<template>
    <v-card
        elevation="4"
    >
        <v-card-text>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    name
                </v-col>
                <v-col class="my-auto" cols="6" v-text="departmentData.name"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    is_active
                </v-col>
                <v-col class="my-auto" cols="6" v-text="departmentData.is_active"></v-col>
            </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data: () => ({
        loader: false,
        departmentData: {
            name: null,
            is_active: false,
        },
    }),
    computed: {
        ...mapGetters("Department", ["department"]),
    },
    methods: {
        ...mapActions("Department", ["show", "delete"]),
        submit: function () {
            this.loader = true

            this.delete(this.departmentData.id)
            .then(() => {
                this.loader = false

                this.$router.push('/departments')
            })
            .catch(err => console.log(err))
        },
    },
    created(){
        this.show(this.$route.params.id)
        .then(res => {
            this.departmentData = this.department
        })
    }
  }
</script>