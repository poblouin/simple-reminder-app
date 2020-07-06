import Entity from '@/entities';
import User from '@/entities/user';
import ReminderCategory from '@/entities/reminder-category';
import ReminderRecurrence from '@/entities/reminder-recurrence';

interface Reminder {
  reminderName: string;
  description: string;
  isDone: boolean;
  dueTimestampUtc: Date;
  category: ReminderCategory | null;
  reminderUser: User | null;
  recurrence: ReminderRecurrence | null;
}

class Reminder implements Entity, Reminder {
  public id: number;
  public reminderName: string;
  public description: string;
  public isDone: boolean;
  public dueTimestampUtc: Date;
  public category: ReminderCategory | null;
  public reminderUser: User | null;
  public recurrence: ReminderRecurrence | null;

  constructor(reminder: any) {
    this.id = reminder.id;
    this.reminderName = reminder.reminderName;
    this.description = reminder.description;
    this.isDone = reminder.isDone;
    this.dueTimestampUtc = reminder.dueTimestampUtc;
    this.category = reminder.category;
    this.reminderUser = reminder.reminderUser;
    this.recurrence = reminder.recurrence;
  }

  toAPI(): object {
    return {
      reminderName: this.reminderName,
      dueTimestampUtc: this.dueTimestampUtc,
      description: this.description,
      ...(this.category ? { category: this.category } : {}),
      ...(this.reminderUser ? { reminderUser: this.reminderUser } : {}),
      ...(this.recurrence ? { recurrence: this.recurrence } : {}),
    };
  }
}

export default Reminder;
