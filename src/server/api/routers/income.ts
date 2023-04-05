import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const incomeRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        amount: z.number().nonnegative(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.income.create({
        data: {
          name: input.name,
          amount: input.amount,
          date: input.date,
        },
      });
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        amount: z.number().nonnegative(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.income.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          amount: input.amount,
          date: input.date,
        },
      });
    }),
  getLast: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.income.findFirst({
      orderBy: { date: "desc" },
    });
  }),
  getHistory: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.income.findMany({
      orderBy: { date: "desc" },
    });
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.income.delete({
      where: {
        id: input,
      },
    });
  }),
});
