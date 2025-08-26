import prisma from "../../shared/prisma";

const getAllStudent = async () => {
  const result = await prisma.student.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          isDeleted: true,
        },
      },
      class: true,
    },
  });

  return result;
};

const getStudentById = async (id) => {
  const result = await prisma.student.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          isDeleted: true,
        },
      },
      class: true,
    },
  });

  return result;
};

export const studentService = { getAllStudent, getStudentById };
