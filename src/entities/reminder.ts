import Entity from '@/entities';
import User from '@/entities/user';
import ReminderCategory from '@/entities/reminder-category';

interface Reminder {
  id: number;
  name: string;
  description: string;
  isDone: boolean;
  dueTimestampUtc: Date;
  category: ReminderCategory | null;
  user: User | null;
}

class Reminder implements Entity, Reminder {
  public id: number;
  public name: string;
  public description: string;
  public isDone: boolean;
  public dueTimestampUtc: Date;
  public category: ReminderCategory | null;
  public user: User | null;

  constructor(reminder: any) {
    this.id = reminder.id;
    this.name = reminder.name;
    this.description = reminder.description;
    this.isDone = reminder.isDone;
    this.dueTimestampUtc = reminder.dueTimestampUtc;
    this.category = reminder.category;
    this.user = reminder.user;
  }

  toAPI(): object {
    return {
      name: this.name,
      dueTimestampUtc: this.dueTimestampUtc,
      description: this.description,
    };
  }
}

export default Reminder;
