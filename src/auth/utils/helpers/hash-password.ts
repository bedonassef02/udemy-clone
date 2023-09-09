import * as bcrypt from 'bcrypt';

const SALT: number = 10;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT);
}
