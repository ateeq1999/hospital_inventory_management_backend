<template>
  <v-app id="inspire" class="info darken-1">
    <v-navigation-drawer
        app
        v-model="drawer"
        color="info darken-1"
        right
        dark
    >
        <v-card color="info darken-1" flat dark >
            <v-row>
                <v-col cols="8" class="white">
                    <v-card class="white" flat>
                        <v-card-text class="black--text text-md-right">
                            Logo
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4">
                    <v-btn
                        color="info darken-1"
                        class="py-6"
                        text
                        @click="taggoleDrawer"
                        v-show="drawer ? true : false"
                    >
                        <v-icon class="white--text">fa-list</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-list class="white--text">
            <v-list-group
                v-for="item in items"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.action"
                no-action
                class="white--text"
            >
                <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title class="white--text" v-text="item.title"></v-list-item-title>
                </v-list-item-content>
                </template>

                <v-list-item
                    v-for="child in item.items"
                    :key="child.title"
                    class="white--text"
                >
                <v-list-item-content class="white--text">
                    <v-list-item-title v-text="child.title"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar class="white" flat app :elevation="!drawer ? '4' : '0'">
        <v-toolbar-title>Link</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card 
            v-show="!drawer ? true : false"
            dark 
            flat 
            class="white"
        >
            <v-card-text class="black--text">
                Logo
            </v-card-text>
        </v-card>
        <v-btn
            v-show="!drawer ? true : false"
            :color="!drawer ? 'info' : 'black'"
            text
            @click="taggoleDrawer"
        >
            <v-icon :color="!drawer ? 'info' : 'black'">fa-list</v-icon>
        </v-btn>
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-app-bar-nav-icon class="white--text white" @click="drawer = !drawer"></v-app-bar-nav-icon> -->

    </v-app-bar>

    <v-main>
      <v-card>
          <h1>CONTENT HERE</h1>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
    export default {
        components: {AppBar},
        data: () => ({ 
            drawer: true,
            mini: true,
            items: [
                {
                    action: 'mdi-ticket',
                    items: [{ title: 'List Item' }],
                    title: 'Attractions',
                },
                {
                action: 'mdi-silverware-fork-knife',
                active: true,
                items: [
                    { title: 'Breakfast & brunch' },
                    { title: 'New American' },
                    { title: 'Sushi' },
                ],
                title: 'Dining',
                },
                {
                action: 'mdi-school',
                items: [{ title: 'List Item' }],
                title: 'Education',
                },
                {
                action: 'mdi-run',
                items: [{ title: 'List Item' }],
                title: 'Family',
                },
                {
                action: 'mdi-bottle-tonic-plus',
                items: [{ title: 'List Item' }],
                title: 'Health',
                },
                {
                action: 'mdi-content-cut',
                items: [{ title: 'List Item' }],
                title: 'Office',
                },
                {
                action: 'mdi-tag',
                items: [{ title: 'List Item' }],
                title: 'Promotions',
                },
            ],
        }),
        methods: {
            taggoleDrawer(){
                this.drawer = !this.drawer
                // this.mini = !this.mini
            }
        }
    }
</script>