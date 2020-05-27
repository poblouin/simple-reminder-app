<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Display Options
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />
      <v-list nav dense>
        <v-list-item v-for="item in items" :key="item.title" :disabled="item.disabled" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mdiCalendarToday, mdiCalendarWeek, mdiCalendarMonth } from '@mdi/js';

export default Vue.extend({
  name: 'App',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Today', icon: mdiCalendarToday },
      { title: 'Week', icon: mdiCalendarWeek, disabled: true },
      { title: 'Month', icon: mdiCalendarMonth, disabled: true },
    ],
    title: process.env.VUE_APP_TITLE,
  }),
});
</script>

<style lang="scss">
html {
  font-size: 16px;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
