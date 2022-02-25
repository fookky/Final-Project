
<template>
  <div>
    <v-app>
      <v-card class="overflow-hidden">
        <v-sheet id="scrolling-techniques-3" class="overflow-y-auto"> </v-sheet>
      </v-card>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-col cols="3">
          <v-autocomplete
            v-model="value"
            :items="items"
            dense
            clearable
            hide-details
            label="Search your Explore"
          ></v-autocomplete>
        </v-col>
        <!-- <v-switch v-model="$vuetify.theme.dark" inset></v-switch> -->
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="() => {}">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt></Nuxt>
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Research Statistics',
          to: '/dashboard',
        },
        {
          icon: 'mdi-apps',
          title: 'Research Explore',
          to: '/search',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Insert Research',
          to: '/insert',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Management of Research Databases',
    }
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
