import { Class } from "@prisma/client";
import prisma from "../../shared/prisma";
import { AppError } from "../../utils/AppError";

const createClass = async (data: Class) => {
  const result = await prisma.class.create({
    data,
  });
  return result;
};

const enrollStudentClass = async (classId: string, studentId: string) => {
  if (classId) {
    const classExists = await prisma.class.findUnique({
      where: { id: classId },
    });
    if (!classExists) {
      throw new AppError("Class not found", 404);
    }
  }

  if (studentId) {
    const studentExists = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!studentExists) {
      throw new AppError("Student not found", 404);
    }
  }

  const result = await prisma.student.update({
    where: { id: studentId },
    data: {
      class_id: classId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      class: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return result;
};

const getAllStudentOfClass = async (classId: string) => {
  if (classId) {
    const classExists = await prisma.class.findUnique({
      where: { id: classId },
    });
    if (!classExists) {
      throw new AppError("Class not found", 404);
    }
  }

  const result = await prisma.student.findMany({
    where: { class_id: classId },
  });
  return result;
};

export const classService = {
  createClass,
  enrollStudentClass,
  getAllStudentOfClass,
};
