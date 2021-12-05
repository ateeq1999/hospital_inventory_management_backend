<template>
<v-row justify="center">
    <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
    >
        <v-card flat class="pa-16">
            <v-card-text v-if="isLoading">
                <v-skeleton-loader
                    type="card-avatar, article, actions"
                >
                </v-skeleton-loader>
            </v-card-text>
            <v-card-text v-if="!isLoading" >
                <v-row>
                    <v-col cols="12" sm="12" md="12" >
                        <v-text-field
                            label="name"
                            outlined
                            v-model="form.name"
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                        quantity
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                        <v-switch
                            v-model="form.is_expire"
                            label="is_expire"
                            :color="form.is_expire ? 'green' : 'red'"
                        ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                        expire_date
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                        <v-text-field
                            label="unit_id"
                            outlined
                            v-model="form.unit_id"
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                        <v-switch
                            v-model="form.is_active"
                            label="is_active"
                            :color="form.is_active ? 'green' : 'red'"
                        ></v-switch>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
                <v-btn 
                    text
                    @click="Cancel"
                >
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="submit"
                >
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data: () => ({
        form: {
            name: null,
            quantity: null,
            is_expire: false,
            expire_date: null,
            unit_id: null,
            is_active: false
        },
        isLoading: true,
    }),
    computed: {
        ...mapGetters("Equipment", ["equipment"]),
    },
    methods: {
        ...mapActions("Equipment", ["update", "show"]),
        async submit () {
            this.isLoading = true

            this.update(this.form)
            .then(() => {
                this.loader = false

                this.$router.push('/equipment')
            })
            .catch(err => console.log(err))

            this.isLoading = false
        },
        async Cancel () {
            this.form = {
                name: null,
                quantity: null,
                is_expire: false,
                expire_date: null,
                unit_id: null,
                is_active: false
            }
        },
    },
    created(){
        this.isLoading = true

        this.show(this.$route.params.id)
        .then(res => {
            this.form = this.equipment
        })

        setTimeout(() => this.isLoading = false, 100)
    }
}
</script>