import { Role } from "../../../generated/prisma";
import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";

const createStudent = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: Role.STUDENT,
  };
  const createStudent = await prisma.user.create({
    data: userData,
  });
  return createStudent;
};

export const userService = { createStudent };
1;
