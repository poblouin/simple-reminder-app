import Entity from '@/entities';

interface User {
  userName: string;
  email: string;
  phone: string;
}

class User implements Entity, User {
  public id: number;
  public userName: string;
  public email: string;
  public phone: string;

  constructor(user: User) {
    this.id = user.id;
    this.userName = user.userName;
    this.email = user.email;
    this.phone = user.phone;
  }

  toAPI(): object {
    throw new Error('Method not implemented.');
  }
}

export default User;
