import Entity from '@/entities';

interface ReminderCategory {
  categoryName: string;
  color: string;
}

class ReminderCategory implements Entity, ReminderCategory {
  public id: number;
  public categoryName: string;
  public color: string;

  constructor(reminderCategory: any) {
    this.id = reminderCategory.id;
    this.categoryName = reminderCategory.categoryName;
    this.color = reminderCategory.color;
  }

  toAPI(): object {
    throw new Error('Method not implemented.');
  }
}

export default ReminderCategory;
