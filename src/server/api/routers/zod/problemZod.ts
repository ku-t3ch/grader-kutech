import z from "zod";
export const addProblemZod = z.object({
  problem_name: z.string(),
  problem_code: z.string(),
  problem_language: z.string(),
  problem_statement: z.string().url(),
});
export type AddProblemSchemaType = z.infer<typeof addProblemZod>;
