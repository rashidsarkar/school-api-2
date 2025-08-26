import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { CreateStudentInput } from "../../types/CreateStudentInput";

const createStudent = async (data: CreateStudentInput) => {
  const hashedPassword = await bcrypt.hash(data.password_hash, 10);
  const studentData = {
    name: data.name,
    email: data.email,
    password_hash: hashedPassword,
    role: Role.STUDENT,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const user = await transactionClient.user.create({
      data: studentData,
    });
    const createStudent = await transactionClient.student.create({
      data: {
        age: data.age,
        class_id: data.class_id,
        userId: user.id,
      },
    });
    return createStudent;
  });

  return result;
};

export const userService = { createStudent };
