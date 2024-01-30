import { db } from "@/server/db";

export const getAllProblem = async () => {
  const data = await db.tasks.findMany();
  return data;
};

export const getProblemById = async (id: string) => {
  const data = await db.tasks.findUnique({
    where: {
      id: id,
    },
  });
  return data;
};
