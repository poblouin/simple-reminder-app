import { Api } from '@/api';
import ReminderCategory from '@/entities/reminder';

export default class ApiReminderCategories extends Api<ReminderCategory> {
  constructor() {
    super('/reminder-categories', 'reminder-category', 'reminder-categories');
  }

  getReminderCategories(): Promise<Array<ReminderCategory>> {
    return this.getAll().then(data => data);
  }

  createReminderCategory(reminderCategory: ReminderCategory): Promise<ReminderCategory> {
    return this.create(reminderCategory).then(rc => rc);
  }
}
