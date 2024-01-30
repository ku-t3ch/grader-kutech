import z from "zod";

export const executeCodeZod = z.object({
  language: z.string(),
  version: z.string(),
  files: z.array(z.object({ name: z.string(), content: z.string() })),
  stdin: z.string().optional(),
  args: z.array(z.string()).optional().default(["1", "2", "3"]),
  compile_timeout: z.number().optional().default(10000),
  run_timeout: z.number().optional().default(3000),
  compile_memory_limit: z.number().optional().default(-1),
  run_memory_limit: z.number().optional().default(-1),
});
export type ExecuteCodeSchemaType = z.infer<typeof executeCodeZod>;
