import { jwtSecretKey } from '@/config';
import { comparePassword } from '@/libs/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export const loginService = async (
  body: Pick<User, 'username' | 'password'>,
) => {
  try {
    const { password, username } = body;

    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) {
      throw new Error('Username atau password salah.');
    }

    const isPasswordValid = await comparePassword(
      String(password),
      String(user.password),
    );

    if (!isPasswordValid) {
      throw new Error('Username atau password salah.');
    }

    const token = sign({ id: user.id, role:user.role }, jwtSecretKey, {
      expiresIn: '2h',
    });

    return {
      message: 'Login success',
      data: user,
      token,
    };
  } catch (error) {
    throw error;
  }
};
