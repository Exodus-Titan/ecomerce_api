import { UserServices } from "../userServices";

const userServices = new UserServices();

export async function userExists(userId: string) {;
  const user = await userServices.getUserById(userId);
  if (user) {
    return true
  } else {
    return false
  }
}
