<script lang="ts">
import Vue from 'vue';

import ApiUsers from '@/api/users';
import User from '@/entities/user';
import ReminderAddForm from '@/components/ReminderAddForm.vue';
import ReminderCard from '@/components/ReminderCard.vue';

export default Vue.extend({
  name: 'Today',
  components: {
    ReminderAddForm,
    ReminderCard,
  },
  data: () => ({
    apiUsers: new ApiUsers(),
    showAddReminderForm: false,
    users: new Array<User>(),
  }),
  async created() {
    this.users = await this.apiUsers.getUsers();
  },
});
</script>

<template>
  <div>
    <ReminderCard :reminder="{}" />
    <ReminderAddForm :dialog.sync="showAddReminderForm" @onClose="showAddReminderForm = false" />
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
