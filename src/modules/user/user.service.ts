import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { CreateStudentInput } from "../../types/CreateStudentInput";
import { AppError } from "../../utils/AppError";

const createAdminAndTeacher = async (data: User) => {
  const hashedPassword = await bcrypt.hash(data.password_hash, 10);
  const userData = {
    name: data.name,
    email: data.email,
    password_hash: hashedPassword,
    role: data.role as Role,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const user = await transactionClient.user.create({
      data: userData,
    });

    switch (data.role) {
      case Role.ADMIN:
        await transactionClient.admin.create({ data: { userId: user.id } });
        break;
      case Role.TEACHER:
        await transactionClient.teacher.create({ data: { userId: user.id } });
        break;
      default:
        throw new AppError("Invalid role", 400);
    }

    //   const createStudent = await transactionClient.student.create({
    //     data: {
    //       age: data.age,
    //       class_id: data.class_id,
    //       userId: user.id,
    //     },
    //   });
    //   return createStudent;
    // });

    return transactionClient.user.findUnique({
      where: { id: user.id },
      include: {
        Admin: true,
        Teacher: true,
      },
    });
  });

  return result;
};

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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isDeleted: true,
          },
        },
      },
    });
    return createStudent;
  });

  return result;
};

export const userService = { createAdminAndTeacher, createStudent };
