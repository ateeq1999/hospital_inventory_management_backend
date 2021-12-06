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
                            <v-autocomplete
                                v-model="form.department_id"
                                    :items="departments"
                                    outlined
                                    chips
                                    color="blue-grey lighten-2"
                                    label="departments"
                                    item-text="name"
                                    item-value="id"
                                    dense
                                >
                                <template v-slot:selection="data">
                                    <v-chip
                                        class="clickable"
                                        v-bind="data.attrs"
                                        :input-value="data.selected"
                                        close
                                        small
                                        @click="removeFromSelected_departments(data.item)"
                                        v-text="data.item.name"
                                    >
                                    </v-chip>
                                </template>
                                <template v-slot:item="data">
                                    <template>
                                    <v-list-item-content v-text="data.item.name"></v-list-item-content>
                                    </template>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" >
                            <v-text-field
                                label="name"
                                outlined
                                v-model="form.name"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" >
                            <v-text-field
                                label="phone"
                                outlined
                                v-model="form.phone"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" >
                            <v-text-field
                                label="password"
                                outlined
                                v-model="form.password"
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
import { mapActions, mapGetters } from 'vuex'
export default {
    data: () => ({
        form: {
            department_id: '',
            name: null,
            phone: null,
            password: null,
            is_active: false,
        },
        isLoading: true,
    }),
    computed: {
        ...mapGetters("Department", ["departments"])
    },
    methods: {
        ...mapActions("Doctor", ["store"]),
        ...mapActions("Department", ["index"]),
        async submit () {
            this.isLoading = true

            await this.store(this.form)

            this.$router.push('/doctors')

            this.isLoading = false
        },
        removeFromSelected_departments (item) {
            const index = this.form.department_id.indexOf(item.id)
            if (index >= 0) this.form.department_id.splice(index, 1)
        },
        async Cancel () {
            this.form = {
                department_id: '',
                name: null,
                phone: null,
                password: null,
                is_active: false,
            }
        },
    },
    created(){
        this.isLoading = true

        this.index()
        .then(res => {
            this.departmentsData = this.departments
        })

        setTimeout(() => this.isLoading = false, 100)
    }
}
</script>