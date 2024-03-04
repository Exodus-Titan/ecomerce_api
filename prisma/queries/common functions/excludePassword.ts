import { User } from "@prisma/client";

class userWithoutPassword {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;

  constructor(id: string, email: string, name: string, isAdmin: boolean) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.isAdmin = isAdmin;
  }
}

export function removePassword(user: User) {
  return new userWithoutPassword(user.id, user.email, user.name, user.isAdmin);
}
