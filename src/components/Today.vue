<script lang="ts">
import Vue from 'vue';

import ApiReminders from '@/api/reminders';
import Reminder from '@/entities/reminder';
import Filters from '@/components/Filters.vue';
import ReminderAddForm from '@/components/ReminderAddForm.vue';
import ReminderCard from '@/components/ReminderCard.vue';
import { ReminderPeriod } from '@/types/index';

export default Vue.extend({
  name: 'Today',
  components: {
    Filters,
    ReminderAddForm,
    ReminderCard,
  },
  data: () => ({
    apiReminders: new ApiReminders(),
    showAddReminderForm: false,
    reminders: new Array<Reminder>(),
    filters: {
      period: ReminderPeriod.TODAY,
    },
  }),
  methods: {
    async onClose() {
      this.showAddReminderForm = false;
      this.reminders = await this.refresh();
    },
    refresh() {
      return this.apiReminders.getReminders(this.filters);
    },
    async onFiltersChange(filters: any) {
      this.filters = {
        ...this.filters,
        ...filters,
      };

      this.reminders = await this.refresh();
    },
  },
});
</script>

<template>
  <div>
    <Filters @onFiltersChange="onFiltersChange" />
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
