export class User {
  id: string;
  email: string;
  username: string;
  name: string;

  constructor(User: User)
  {
    this.id = User.id;
    this.email = User.email;
    this.username = User.username;
    this.name = User.name;
  }
}
