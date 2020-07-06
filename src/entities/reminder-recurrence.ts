import Entity from '@/entities';
import { RecurrenceFrequency } from '@/types';

interface ReminderRecurrence {
  frequency: RecurrenceFrequency;
  untilUtc: Date;
}

class ReminderRecurrence implements Entity, ReminderRecurrence {
  public id: number;
  public frequency: RecurrenceFrequency;
  public untilUtc: Date;

  constructor(reminderRecurrence: any) {
    this.id = reminderRecurrence.id;
    this.frequency = reminderRecurrence.frequency;
    this.untilUtc = reminderRecurrence.untilUtc;
  }

  toAPI(): object {
    throw new Error('Method not implemented.');
  }
}

export default ReminderRecurrence;
