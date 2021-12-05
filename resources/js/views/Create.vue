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
                        <v-text-field
                            label="quantity"
                            outlined
                            v-model="form.quantity"
                            dense
                            type="number"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                        <v-switch
                            v-model="form.is_expire"
                            label="is_expire"
                            :color="form.is_expire ? 'green' : 'red'"
                        ></v-switch>
                    </v-col>
                    <v-col v-show="form.is_expire" cols="12" sm="12" md="12" >
                        <v-menu
                            v-model="open_expire_date_Picker"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                outlined
                                dense
                                v-model="form.expire_date"
                                label="Expire Date"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                                <!-- prepend-icon="mdi-calendar" -->
                            </template>
                            <v-date-picker
                            v-model="form.expire_date"
                            @input="open_expire_date_Picker = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                        <v-autocomplete
                            v-model="form.unit_id"
                            :items="unitsData"
                            outlined
                            chips
                            color="blue-grey lighten-2"
                            label="Units"
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
                                @click="removeFromSelectedUnits(data.item)"
                                >
                                {{ data.item.name }}
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
            name: null,
            quantity: null,
            is_expire: false,
            expire_date: null,
            unit_id: null,
            is_active: false
        },
        unitsData: [],
        isLoading: true,
        open_expire_date_Picker: false,
    }),
    computed: {
        ...mapGetters("Unit", ["units"])
    },
    methods: {
        ...mapActions("Equipment", ["create"]),
        ...mapActions("Unit", ["index"]),
        async submit () {
            this.isLoading = true

            console.log(this.form)

            await this.create(this.form)

            this.$router.push('/equipment/index')

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

        this.index()
        .then(res => {
            this.unitsData = this.units
        })

        setTimeout(() => this.isLoading = false, 100)
    }
}
</script>