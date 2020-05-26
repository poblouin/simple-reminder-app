<template>
  <div>
    {{ users }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SimpleReminder',
  data: () => ({
    users: null,
  }),
  async created() {
    this.users = await this.$http.get('/users');
  },
});
</script>

<style scoped lang="scss"></style>
