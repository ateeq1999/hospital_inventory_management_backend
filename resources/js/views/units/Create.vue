<template>
    <v-card
        elevation="4"
      >
        <v-card-text>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="12">
                    <form class="pa-16 rounded-xl">
                        <v-row>
                            <v-col cols="12">
                                <v-card class="text-md-center" flat>Create Unit Form</v-card>
                            </v-col>
                        </v-row>
                        <v-row class="clickable">
                            <v-col md="12" sm="12">
                            <v-text-field
                                outlined
                                v-model="form.name"
                                :error-messages="nameErrors"
                                label="Name"
                                required
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                            ></v-text-field>
                            </v-col>
                            <v-col md="12" sm="12">
                            <v-switch
                                v-model="form.is_active"
                                label="Active"
                                :color="form.is_active ? 'green' : 'red'"
                            ></v-switch>
                            </v-col>
                            <v-col md="12" sm="12">
                            <v-row>
                                <v-col class="d-flex justify-end" md="6" sm="6">
                                    <v-btn
                                        class="clickable"
                                        @click="clear"
                                        plain
                                        color="success"
                                    >
                                        Clear
                                    </v-btn>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col class="d-flex justify-start" md="6" sm="6">
                                    <v-btn
                                        class="clickable"
                                        @click="submit"
                                        outlined
                                    >
                                        submit
                                    </v-btn>
                                </v-col>
                            </v-row>
                            </v-col>
                        </v-row>
                    </form>
                </v-col>
            </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import {mapActions} from 'vuex'
export default {
    mixins: [validationMixin],
    validations: {
      name: { required },
    },
    data: () => ({
      loader: false,
      form: {
        name: '',
        is_active: false,
      },
    }),
    computed: {
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push('name is required.')
            return errors
        },
    },
    methods: {
        // ...mapActions("Unit/store"),
        ...mapActions("Unit", ["store"]),
        submit: function () {
            this.loader = true

            this.store(this.form)
            .then(() => {
                this.loader = false

                this.$router.push('/units')
            })
            .catch(err => console.log(err))
        },
        clear () {
            this.$v.$reset()
            this.form.name = ''
            this.form.is_active = false
        },
    },
  }
</script>