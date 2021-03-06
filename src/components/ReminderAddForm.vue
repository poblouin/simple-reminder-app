<script lang="ts">
import Vue from 'vue';
import { Datetime } from 'vue-datetime';

import ApiReminders from '@/api/reminders';
import ApiReminderCategories from '@/api/reminder-categories';
import ApiUsers from '@/api/users';
import Reminder from '@/entities/reminder';
import ReminderCategory from '@/entities/reminder-category';
import User from '@/entities/user';
import { RecurrenceFrequency } from '@/types';

const COLORS = Object.freeze([
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
  'grey',
]);

export default Vue.extend({
  name: 'ReminderAddForm',
  components: {
    Datetime,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const defaultForm = Object.freeze({
      reminder: {
        reminderName: '',
        description: '',
        dateTime: new Date().toISOString(),
      },
      category: {
        categoryName: '',
        color: '',
      },
      reminderUser: null,
      recurrence: {
        frequency: null,
        untilUtc: null,
      },
    });

    return {
      COLORS: COLORS,
      apiReminders: new ApiReminders(),
      apiReminderCategories: new ApiReminderCategories(),
      apiUsers: new ApiUsers(),
      form: Object.assign({}, defaultForm),
      frequencies: Object.values(RecurrenceFrequency).map(f => ({
        text: f,
        value: f,
      })),
      rules: {
        required: [(val: any) => (val || '').length > 0 || 'This field is required'],
      },
      defaultForm,
      offsetTop: 0,
      categories: Array<any>(),
      reminderUsers: Array<any>(),
    };
  },
  computed: {
    formIsValid(): boolean {
      return (this.$refs.form as Vue & { validate: () => boolean }).validate();
    },
  },
  async created() {
    this.getCategories();
    this.getUsers();
  },
  methods: {
    onScroll(e: any) {
      this.offsetTop = e.target.scrollTop;
    },
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
    },
    async getCategories() {
      this.categories = (await this.apiReminderCategories.getReminderCategories()).map(rc => ({
        text: `${rc.categoryName} - ${rc.color}`,
        value: rc,
      }));
    },
    async getUsers() {
      this.reminderUsers = (await this.apiUsers.getUsers()).map(u => ({
        text: `${u.userName}`,
        value: u,
      }));
    },
    async submit() {
      if (!this.formIsValid) {
        return;
      }

      try {
        await this.apiReminders.createReminder(
          new Reminder({
            reminderName: this.form.reminder.reminderName,
            description: this.form.reminder.description,
            dueTimestampUtc: new Date(this.form.reminder.dateTime).getTime(),
            category:
              this.form.category?.categoryName !== ''
                ? new ReminderCategory(this.form.category)
                : null,
            reminderUser: this.form.reminderUser,
            recurrence: this.form.recurrence.frequency ? this.form.recurrence : null,
          })
        );

        this.$toasted.success('Reminder created!');
        this.getCategories();
        this.close();
      } catch (err) {
        this.$toasted.error(`Error creating reminder: ${err}`);
      }
    },
    close() {
      this.resetForm();
      this.$emit('onClose');
    },
  },
});
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" eager>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>New Reminder</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="submit">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-form ref="form" @submit.prevent="submit">
          <v-container id="scroll-target" fluid>
            <v-row v-scroll:#scroll-target="onScroll" align="center" justify="center">
              <v-col>
                <v-subheader class="header">Reminder</v-subheader>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.reminder.reminderName"
                      :rules="rules.required"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-textarea v-model="form.reminder.description" :rows="3">
                      <template v-slot:label>
                        <div>Description <small>(optional)</small></div>
                      </template>
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-input
                      v-model="form.reminder.dateTime"
                      label="Date/Time"
                      :rules="rules.required"
                    >
                      <Datetime
                        v-model="form.reminder.dateTime"
                        nput-id="datetime"
                        :auto="true"
                        class="date-time"
                        type="datetime"
                      >
                      </Datetime>
                    </v-input>
                  </v-col>
                </v-row>
                <v-subheader class="header">Category (Pick one or create new)</v-subheader>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.category"
                      :items="categories"
                      label="Available Categories"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.category.categoryName"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.category.color"
                      :items="COLORS"
                      label="Color"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-subheader class="header">User</v-subheader>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.reminderUser"
                      :items="reminderUsers"
                      label="Available Users"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-subheader class="header">Recurrence</v-subheader>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.recurrence.frequency"
                      :items="frequencies"
                      label="Frequency"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style lang="scss" scoped>
@import '~vue-datetime/dist/vue-datetime.css';

.header {
  padding: 0;
  height: 0;
}

.date-time {
  padding-left: 2em;
}
</style>
