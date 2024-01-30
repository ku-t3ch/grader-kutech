
import { createTRPCRouter } from "@/server/api/trpc";
import { problemRouter } from "./routers/problem";
import { pistonRouter } from "./routers/piston";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  problem: problemRouter,
  piston: pistonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
