import { z } from "zod";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
} from "../trpc";
import {
  addProblemZod,
  editProblemZod,
  saveTestCaseProblemZod,
} from "./zod/problemZod";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";

// submit
const submitZod = z.object({
  code: z.string(),
});
const submit = protectedProcedure
  .input(submitZod)
  .mutation(({ ctx, input }) => {
    return {
      hello: "world",
    };
  });

// addProblem
const addProblem = protectedAdminProcedure
  .input(addProblemZod)
  .mutation(async ({ ctx, input }) => {
    const result = await db.tasks.create({
      data: {
        code: input.problem_code,
        name: input.problem_name,
        statement: input.problem_statement,
        language: input.problem_language,
        version: input.problem_language_version!,
        owner: {
          connect: { email: ctx.session.user.email! },
        },
      },
    });
    return result;
  });

const editProblem = protectedAdminProcedure
  .input(editProblemZod)
  .mutation(async ({ ctx, input }) => {
    const result = await db.tasks.update({
      where: {
        id: input.problem_id,
      },
      data: {
        code: input.problem_code,
        name: input.problem_name,
        statement: input.problem_statement,
        language: input.problem_language,
        version: input.problem_language_version!,
      },
    });
    return result;
  });

const saveTestCaseProblem = protectedAdminProcedure
  .input(saveTestCaseProblemZod)
  .mutation(async ({ ctx, input }) => {
    await db.tasks.update({
      where: {
        id: input.problem_id,
      },
      data: {
        testCase: input.test_case as Prisma.JsonArray,
      },
    });

    return {};
  });

export const problemRouter = createTRPCRouter({
  submit: submit,
  addProblem: addProblem,
  editProblem: editProblem,
  saveTestCaseProblem: saveTestCaseProblem,
});
