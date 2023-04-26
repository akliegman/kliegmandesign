import { UserCredentials } from "../types/user.types";
import { authConfig } from "../config/auth";

export const credentialsExistTest = (
  user: UserCredentials | undefined
): string | null => {
  const errors: string[] = [];

  if (!user) {
    errors.push("No user name or password");
  }
  if (!user?.name && user?.pass) {
    errors.push("No user name");
  }
  if (!user?.pass && user?.name) {
    errors.push("No password");
  }

  if (errors.length > 0) {
    return errors.join(", ");
  }

  return null;
};

export const userCredentialsTest = (user: UserCredentials | undefined) => {
  const allowedPasswords = authConfig.pass.split(",");
  const errors: string[] = [];

  if (
    user?.name &&
    user?.name !== authConfig.user &&
    user?.pass &&
    !allowedPasswords.includes(user?.pass)
  ) {
    errors.push("User name and password are incorrect");
  }
  if (user?.name && user?.name !== authConfig.user) {
    errors.push("User name is incorrect");
  }
  if (user?.pass && !allowedPasswords.includes(user?.pass)) {
    errors.push("Password is incorrect");
  }

  if (errors.length > 0) {
    return errors.join(", ");
  }

  return null;
};

export const adminCredentialsTest = (user: UserCredentials | undefined) => {
  const errors: string[] = [];

  if (user?.pass && user?.pass !== authConfig.adminPass) {
    errors.push("Password is incorrect");
  }

  if (errors.length > 0) {
    return errors.join(", ");
  }

  return null;
};
