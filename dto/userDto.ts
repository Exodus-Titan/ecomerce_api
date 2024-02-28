export class UserDto{
  email: string;
  name: string;
  passwordHash: string;
  role : string;

  constructor(email: string, name: string, passwordHash: string, role: string){
    this.email = email;
    this.name = name;
    this.passwordHash = passwordHash;
    this.role = role;
  }
}
