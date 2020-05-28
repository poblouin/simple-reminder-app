import { Api } from '@/api';
import Reminder from '@/entities/reminder';

export default class ApiReminders extends Api<Reminder> {
  constructor() {
    super('/reminders', 'reminder', 'reminders');
  }

  getReminders(filters?: Array<string>): Promise<Array<Reminder>> {
    return this.getAll(filters).then(data => {
      return data.map(r => new Reminder({ ...r, dueTimestampUtc: new Date(r.dueTimestampUtc) }));
    });
  }

  createReminder(reminder: Reminder): Promise<Reminder> {
    return this.create(reminder).then(r => {
      return r;
    });
  }
}
