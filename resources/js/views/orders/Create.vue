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
                                v-model="form.doctor_id"
                                    :items="doctors"
                                    outlined
                                    chips
                                    color="blue-grey lighten-2"
                                    label="doctors"
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
                                        @click="removeFromSelected_doctors(data.item)"
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
                            <v-autocomplete
                                v-model="form.equipments"
                                :items="equipmentData"
                                outlined
                                chips
                                color="blue-grey lighten-2"
                                label="equipment"
                                item-text="name"
                                item-value="id"
                                multiple
                                dense
                            >
                                <template v-slot:selection="data">
                                    <v-chip
                                        class="clickable"
                                        v-bind="data.attrs"
                                        :input-value="data.selected"
                                        close
                                        small
                                        @click="removeFromSelected_equipments(data.item)"
                                        v-text="data.item.name"
                                    >
                                    </v-chip>
                                </template>
                                <template v-slot:item="data">
                                    <template>
                                    <v-list-item-content @click="addToEquipments(data.item)" v-text="data.item.name"></v-list-item-content>
                                    </template>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" >
                            <v-autocomplete
                                v-model="form.status"
                                :items="statuses"
                                outlined
                                chips
                                color="blue-grey lighten-2"
                                label="Status"
                                item-text="name"
                                item-value="id"
                                dense
                            ></v-autocomplete>
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
            doctor_id: '',
            department_id: '',
            equipments: [],
            status: '',
        },
        statuses: [ 
            {name: 'CREATED'},
            {name: 'ON_PROGRESS'},
            {name: 'SUCCESS'},
            {name: 'CANCLE'},
        ],
        equipmentData: [],
        doctorsData: [],
        departmentsData: [],
        isLoading: true,
    }),
    computed: {
        ...mapGetters("Doctor", ["doctors"]),
        ...mapGetters("Department", ["departments"]),
        ...mapGetters("Equipment", ["equipments"]),
    },
    methods: {
        ...mapActions("Order", ["store"]),
        ...mapActions("Doctor", {getDoctors: "index"}),
        ...mapActions("Department", {getDepartments: "index"}),
        ...mapActions("Equipment", {getEquipment: "index"}),
        async submit () {
            this.isLoading = true

            console.log(this.form)

            await this.store(this.form)

            this.$router.push('/orders')

            this.isLoading = false
        },
        removeFromSelected_doctors (item) {
            const index = this.doctorsData.indexOf(item.id)
            if (index >= 0) this.doctorsData.splice(index, 1)
        },
        removeFromSelected_departments (item) {
            console.log(item)
            const index = this.departmentsData.indexOf(item.id)
            if (index >= 0) this.departmentsData.splice(index, 1)
        },
        removeFromSelected_equipment (item) {
            const index = this.equipmentData.indexOf(item.id)
            if (index >= 0) this.equipmentData.splice(index, 1)
        },
        async Cancel () {
            this.form = {
                doctor_id: '',
                department_id: '',
                items: [],
                status: null,
            }
        },
    },
    created(){
        this.isLoading = true

        this.getDoctors()
        .then(res => {
            this.doctorsData = this.doctors
        })
        this.getDepartments()
        .then(res => {
            this.departmentsData = this.departments
        })
        this.getEquipment()
        .then(res => {
            this.equipmentData = this.equipments
        })

        setTimeout(() => this.isLoading = false, 100)
    }
}
</script>