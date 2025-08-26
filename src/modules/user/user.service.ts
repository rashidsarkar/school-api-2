import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { CreateStudentInput } from "../../types/CreateStudentInput";
import { AppError } from "../../utils/AppError";

const createUser = async (data: User & CreateStudentInput) => {
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
      case Role.STUDENT:
        await transactionClient.student.create({
          data: {
            age: data.age,
            class_id: data.class_id,
            userId: user.id,
          },
        });
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
        Student: true,
        Admin: true,
        Teacher: true,
      },
    });
  });

  return result;
};

export const userService = { createUser };
