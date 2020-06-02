<script lang="ts">
import Vue from 'vue';

import ApiReminders from '@/api/reminders';
import Reminder from '@/entities/reminder';
import ReminderAddForm from '@/components/ReminderAddForm.vue';
import ReminderCard from '@/components/ReminderCard.vue';

export default Vue.extend({
  name: 'Today',
  components: {
    ReminderAddForm,
    ReminderCard,
  },
  data: () => ({
    apiReminders: new ApiReminders(),
    showAddReminderForm: false,
    reminders: new Array<Reminder>(),
  }),
  async created() {
    this.reminders = await this.refresh();
  },
  methods: {
    async onClose() {
      this.showAddReminderForm = false;
      this.reminders = await this.refresh();
    },
    refresh() {
      return this.apiReminders.getReminders();
    }
  },
});
</script>

<template>
  <div>
    <ReminderCard
      v-for="reminder in reminders"
      :key="reminder.id"
      :reminder="reminder"
      @onMarkDone="refresh"
    />
    <ReminderAddForm :dialog.sync="showAddReminderForm" @onClose="onClose" />
    <v-fab-transition>
      <v-btn
        class="add-btn"
        color="orange"
        dark
        fixed
        bottom
        right
        fab
        @click="showAddReminderForm = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<style scoped lang="scss">
.add-btn {
  bottom: 2em;
  right: 2em;
}
</style>
