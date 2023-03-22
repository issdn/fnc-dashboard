import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const databaseRouter = createTRPCRouter({
  getAllExpenses: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.expense.findMany();
  }),
});
