export class UserDto{
  email: string;
  name: string;
  paswordHash: string;
  role : string;

  constructor(email: string, name: string, paswordHash: string, role: string){
    this.email = email;
    this.name = name;
    this.paswordHash = paswordHash;
    this.role = role;
  }
}
