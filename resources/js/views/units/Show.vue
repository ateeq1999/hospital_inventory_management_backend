<template>
    <v-card
        elevation="4"
    >
        <v-card-text>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    Name
                </v-col>
                <v-col class="my-auto" cols="6">
                    {{unitData.name}}
                </v-col>
            </v-row>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    Active
                </v-col>
                <v-col class="my-auto" cols="6">
                    {{unitData.is_active}}
                </v-col>
            </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data: () => ({
      loader: false,
      unitData: {
        name: '',
        is_active: false,
      },
    }),
    computed: {
        ...mapGetters("Unit", ["unit"]),
    },
    methods: {
        ...mapActions("Unit", ["show", "delete"]),
        submit: function () {
            this.loader = true

            this.delete(this.unitData.id)
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
            this.unitData = this.unit
        })
    }
  }
</script>