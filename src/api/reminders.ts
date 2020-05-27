import { Api } from '@/api';
import Reminder from '@/entities/reminders';

export default class ApiReminders extends Api<Reminder> {
  constructor() {
    super('/reminders', 'reminder', 'reminders');
  }

  getReminders(filters?: Array<string>): Array<Reminder> {
    return this.getAll(filters).then(data => data);
  }

  createReminder(reminder: Reminder): Reminder {
    return this.create(reminder).then(data => data);
  }
}
