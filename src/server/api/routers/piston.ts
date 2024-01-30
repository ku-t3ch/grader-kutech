import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import axios from "axios";
import { RuntimesResponeInterface } from "@/interface/RuntimesResponeInterface";
import { env } from "process";

const getRuntimes = protectedProcedure.query(async ({ ctx, input }) => {
  const { data } = await axios.get<RuntimesResponeInterface[]>(
    `${env.PISTON_API}/api/v2/runtimes`,
  );
  return data;
});

export const pistonRouter = createTRPCRouter({
  getRuntimes: getRuntimes,
});
