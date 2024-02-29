import { User } from "@prisma/client";

class userWithoutPassword {
  id: string;
  email: string;
  name: string;
  role: boolean;

  constructor(id: string, email: string, name: string, role: boolean) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
  }
}

export function removePassword(user: User) {
  return new userWithoutPassword(user.id, user.email, user.name, user.role);
}
