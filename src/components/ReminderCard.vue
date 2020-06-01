<script lang="ts">
import Vue, { PropType } from 'vue';

import Reminder from '@/entities/reminder';
import ApiReminders from '@/api/reminders';

export default Vue.extend({
  name: 'ReminderCard',
  props: {
    reminder: {
      type: Object as PropType<Reminder>,
      required: true,
    },
  },
  data: () => ({
    apiReminders: new ApiReminders(),
  }),
  computed: {
    colorDisplay(): string {
      return this.reminder.category ? this.reminder.category?.color : 'grey darken-2';
    },
    dateDisplay(): string {
      return `${this.reminder.dueTimestampUtc.getHours()}:${this.reminder.dueTimestampUtc
        .getMinutes()
        .toString()
        .padEnd(2, '0')}`;
    },
  },
  methods: {
    async markDone() {
      try {
        await this.apiReminders.update(this.reminder);
        this.$toasted.success('marked done!');
      } catch {
        this.$toasted.error('could not mark done');
      }
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
        :color="colorDisplay"
        dark
        outlined
      >
        <v-card-title class="headline">{{ reminder.reminderName }}</v-card-title>
        <v-card-subtitle>Due at {{ dateDisplay }}</v-card-subtitle>
        <v-card-text>{{ reminder.description }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
