import z from "zod";

export const addProblemZod = z.object({
  problem_name: z.string(),
  problem_code: z.string(),
  problem_language: z.string(),
  problem_language_version: z.string().optional(),
  problem_statement: z.string().url(),
});
export type AddProblemSchemaType = z.infer<typeof addProblemZod>;

export const editProblemZod = z.object({
  problem_id: z.string().optional(),
  problem_name: z.string(),
  problem_code: z.string(),
  problem_language: z.string(),
  problem_language_version: z.string().optional(),
  problem_statement: z.string().url(),
});
export type EditProblemSchemaType = z.infer<typeof editProblemZod>;

export const saveTestCaseProblemZod = z.object({
  problem_id: z.string(),
  test_case: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      id: z.string(),
    }),
  ),
});
export type SaveTestCaseProblemSchemaType = z.infer<
  typeof saveTestCaseProblemZod
>;
