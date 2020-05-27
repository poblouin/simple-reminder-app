<script lang="ts">
import Vue from 'vue';

import ApiUsers from '@/api/users';
import User from '@/entities/user';

export default Vue.extend({
  name: 'ReminderCard',
  props: {
    reminder: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    apiUsers: new ApiUsers(),
    users: new Array<User>(),
  }),
  methods: {
    markDone() {
      console.log('done');
    },
    postpone() {
      console.log('postpone');
    },
  },
});
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <v-card
        v-touch="{
          left: () => postpone(),
          right: () => markDone(),
        }"
        color="#385F73"
        dark
      >
        <v-card-title class="headline">Reminder</v-card-title>

        <v-card-subtitle>Reminder description</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>
