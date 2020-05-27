import Entity from '@/entities';

interface ReminderCategory {
  id: number;
  name: string;
  color: string;
}

class ReminderCategory implements Entity, ReminderCategory {
  public id: number;
  public name: string;
  public color: string;

  constructor(reminderCategory: ReminderCategory) {
    this.id = reminderCategory.id;
    this.name = reminderCategory.name;
    this.color = reminderCategory.color;
  }

  toAPI(): object {
    throw new Error('Method not implemented.');
  }
}

export default ReminderCategory;
