import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import axios from "axios";
import { type RuntimesResponeInterface } from "@/interface/RuntimesResponeInterface";
import { env } from "process";
import { executeCodeZod } from "./zod/pistonZod";
import Piston, { SubmissionResult } from "piston-js";

const getRuntimes = protectedProcedure.query(async ({ ctx, input }) => {
  const { data } = await axios.get<RuntimesResponeInterface[]>(
    `${env.PISTON_API}/api/v2/runtimes`,
  );
  return data;
});

const executeCode = protectedProcedure
  .input(executeCodeZod)
  .mutation(async ({ ctx, input }) => {
    const { data } = await axios.post(`${env.PISTON_API}/api/v2/execute`, {
      ...input,
    });
    return data;
  });

export const pistonRouter = createTRPCRouter({
  getRuntimes: getRuntimes,
  executeCode: executeCode,
});
