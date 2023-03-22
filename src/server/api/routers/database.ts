import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const databaseRouter = createTRPCRouter({
  getAllExpenses: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.expense.findMany();
  }),
  addCategory: publicProcedure
    .input(z.object({ name: z.string(), monthly_treshold: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name.toLowerCase(),
          monthly_treshold: parseFloat(input.monthly_treshold.toPrecision(2)),
        },
      });
    }),
});
