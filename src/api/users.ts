import { Api } from '@/api';
import User from '@/entities/user';

export default class ApiUsers extends Api<User> {
  constructor() {
    super('/users', 'user', 'users');
  }

  getUsers(filters?: Array<string>): Promise<Array<User>> {
    return this.getAll(filters).then(data => data);
  }
}
