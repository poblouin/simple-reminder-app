<script lang="ts">
import ApiReminders from '@/api/reminders';
import Reminder from '@/entities/reminder';

export default {
  name: 'ReminderAddForm',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const defaultForm = Object.freeze({
      name: '',
      description: '',
      dateTime: null,
    });

    const flatpickrConfig = Object.freeze({
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      position: 'above',
    });

    return {
      apiReminders: new ApiReminders(),
      flatpickr: null,
      flatpickrConfig,
      form: Object.assign({}, defaultForm),
      rules: {
        required: [val => (val || '').length > 0 || 'This field is required'],
      },
      defaultForm,
    };
  },
  computed: {
    formIsValid() {
      return this.$refs.form.validate();
    },
  },
  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    async submit() {
      if (!this.formIsValid) {
        return;
      }

      await this.apiReminders.createReminder(
        new Reminder({
          name: this.form.name,
          description: this.form.description,
          dueTimestampUtc: new Date(this.form.dateTime).getTime(),
        })
      );
      this.resetForm();
      this.$emit('onClose');
    },
  },
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" eager>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('onClose')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>New Reminder</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="submit">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-form ref="form" @submit.prevent="submit">
          <v-container fluid>
            <v-row v-scroll align="center" justify="center">
              <v-col>
                <v-subheader class="header">Reminder</v-subheader>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.name"
                      :rules="rules.required"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-textarea v-model="form.description" :rows="3">
                      <template v-slot:label>
                        <div>Description <small>(optional)</small></div>
                      </template>
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-input label="Date/Time">
                      <flat-pickr
                        v-model="form.dateTime"
                        class="date-time"
                        :config="flatpickrConfig"
                        placeholder="Select date"
                        name="date"
                      >
                      </flat-pickr>
                    </v-input>
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
.header {
  padding: 0;
  height: 0;
}

.date-time {
  padding-left: 2em;
}
</style>
