import { ReminderPeriod } from '@/types/index';
export default interface ApiReminderFilters {
  is_done?: boolean;
  period?: ReminderPeriod;
  [key: string]: any;
}
