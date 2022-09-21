import config from '../config';
import bcrypt from 'bcrypt';

export const hashingPassword =
  (
    password: string
  ): string => {
    const salt =
      Number(
        config.salt as unknown as string
      );
    const pepper =
      config.pepper;
    const hashedPassword =
      bcrypt.hashSync(
        `${password}${pepper}`,
        salt
      );
    return hashedPassword;
  };
