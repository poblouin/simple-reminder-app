<template>
  <v-expansion-panels :focusable="true" :hover="true">
    <v-expansion-panel>
      <v-expansion-panel-header>Filters</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-switch
          v-model="filters.isDone"
          class="ma-2"
          label="Show Marked as done"
          @change="onChange"
        ></v-switch>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import snakecase from 'lodash.snakecase';
import Vue from 'vue';
import ApiReminderFilters from '@/interfaces/reminder-filters';

export default Vue.extend({
  name: 'Filters',
  data() {
    return {
      filters: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        is_done: false,
      } as ApiReminderFilters,
    };
  },
  created() {
    this.onChange();
  },
  methods: {
    onChange() {
      this.$emit(
        'onFiltersChange',
        Object.assign(
          {},
          ...Object.keys(this.filters).map(k => ({
            [snakecase(k)]: this.filters[k],
          }))
        )
      );
    },
  },
});
</script>
