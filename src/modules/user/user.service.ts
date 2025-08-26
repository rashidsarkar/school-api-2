import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcrypt";

const createStudent = async (data: User) => {
  const hashedPassword = await bcrypt.hash(data.password_hash, 10);
  const studentData = {
    name: data.name,
    email: data.email,
    password_hash: hashedPassword,
    role: Role.STUDENT,
  };
  const createStudent = await prisma.user.create({
    data: studentData,
  });
  return createStudent;
};

export const userService = { createStudent };
