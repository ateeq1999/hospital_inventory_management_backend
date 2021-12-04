<template>
    <v-card
        elevation="4"
      >
        <v-card-text>
            <v-row class="clickable fill-height">
                <v-col class="my-auto" cols="6">
                    <form class="pa-16 rounded-xl">
                        <v-row>
                            <v-col cols="12">
                                <v-card class="text-md-center" flat>Admin Login</v-card>
                            </v-col>
                        </v-row>
                        <v-row class="clickable">
                            <v-col md="12" sm="12">
                            <v-text-field
                                outlined
                                v-model="email"
                                :error-messages="emailErrors"
                                label="E-mail"
                                required
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                            ></v-text-field>
                            </v-col>
                            <v-col md="12" sm="12">
                            <v-text-field
                                :type="'password'"
                                outlined
                                v-model="password"
                                :error-messages="passwordErrors"
                                label="Password"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                            ></v-text-field>
                            </v-col>
                            <v-col md="12" sm="12">
                            <v-row>
                                <v-col class="d-flex justify-end" md="6" sm="6">
                                    Don't have an account? <v-btn
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
                                        @click="login"
                                        outlined
                                    >
                                        Login
                                    </v-btn>
                                </v-col>
                            </v-row>
                            </v-col>
                        </v-row>
                    </form>
                </v-col>
                <v-col cols="6" class="my-auto">
                    Image here
                </v-col>
            </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  export default {
    mixins: [validationMixin],
    validations: {
      password: { required, maxLength: maxLength(100) },
      email: { required, email },
    },
    data: () => ({
      loader: false,
      email: 'admin@admin.com',
      password: 'password',
      loading: false
    }),
    computed: {
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.maxLength && errors.push('password must be at most 10 characters long')
        !this.$v.password.required && errors.push('password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },
    methods: {
        login: function () {
            this.loader = this.$store.getters.loading
            let email = this.email
            let password = this.password
            this.$store.dispatch('Auth/login', { email, password })
        .then(() => {
            this.loader = false
            this.$router.push('/dashboard')
        })
        .catch(err => console.log(err))
    },
    clear () {
        this.$v.$reset()
        this.password = ''
        this.email = ''
        this.select = null
        this.checkbox = false
    },
    },
  }
</script>