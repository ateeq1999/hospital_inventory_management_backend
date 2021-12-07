<template>
    <v-card
        elevation="4"
    >
        <v-card-text>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    doctor_id
                </v-col>
                <v-col class="my-auto" cols="6" v-text="orderData.doctor_id"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    department_id
                </v-col>
                <v-col class="my-auto" cols="6" v-text="orderData.department_id"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    items
                </v-col>
                <v-col class="my-auto" cols="6" v-text="orderData.items"></v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    status
                </v-col>
                <v-col class="my-auto" cols="6" v-text="orderData.status"></v-col>
            </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data: () => ({
        loader: false,
        orderData: {
            status: null,
        },
    }),
    computed: {
        ...mapGetters("Order", ["order"]),
    },
    methods: {
        ...mapActions("Order", ["show", "delete"]),
        submit: function () {
            this.loader = true

            this.delete(this.orderData.id)
            .then(() => {
                this.loader = false

                this.$router.push('/orders')
            })
            .catch(err => console.log(err))
        },
    },
    created(){
        this.show(this.$route.params.id)
        .then(res => {
            this.orderData = this.order
        })
    }
  }
</script>