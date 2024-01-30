import { z } from "zod";
import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedProcedure,
} from "../trpc";
import { addProblemZod } from "./zod/problem";
import { db } from "@/server/db";

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
        language: input.problem_language,
        owner: {
          connect: { email: ctx.session.user.email! },
        },
      },
    });
    return result;
  });

export const problemRouter = createTRPCRouter({
  submit: submit,
  addProblem: addProblem,
});
