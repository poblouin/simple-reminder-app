import Entity from '@/entities';

interface ReminderCategory {
  id: number;
  categoryName: string;
  color: string;
}

class ReminderCategory implements Entity, ReminderCategory {
  public id: number;
  public categoryName: string;
  public color: string;

  constructor(reminderCategory: ReminderCategory) {
    this.id = reminderCategory.id;
    this.categoryName = reminderCategory.categoryName;
    this.color = reminderCategory.color;
  }

  toAPI(): object {
    throw new Error('Method not implemented.');
  }
}

export default ReminderCategory;
