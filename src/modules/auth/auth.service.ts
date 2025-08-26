import prisma from "../../shared/prisma";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "../../utils/generateToken";
import config from "../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!userData) {
    throw new AppError("User not found", 404);
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password_hash
  );
  console.log(isCorrectPassword);
  if (!isCorrectPassword) {
    throw new AppError("Invalid password", 401);
  }

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.accessTokenSecret as string,
    "15m"
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.refreshTokenSecret as string,
    "7d"
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, config.refreshTokenSecret as string);
  } catch (error) {
    throw new AppError("You are not authorized", 401);
  }
  const userData = await prisma.user.findUnique({
    where: {
      email: (decodedData as jwt.JwtPayload).email,
    },
  });
  if (!userData) {
    throw new AppError("User not found", 404);
  }

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    "15m"
  );
  return { accessToken };
};
export const authService = { loginUser, refreshToken };
