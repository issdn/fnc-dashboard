import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const expenseRouter = createTRPCRouter({
  addExpense: publicProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        category_name: z.string().min(1),
        name: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.expense.create({
        data: {
          amount: input.amount,
          category_name: input.category_name,
          name: input.name,
          date: input.date,
        },
      });
    }),
  editExpense: publicProcedure
    .input(
      z.object({
        id: z.string(),
        amount: z.number().positive(),
        category_name: z.string().min(1),
        name: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.expense.update({
        where: {
          id: input.id,
        },
        data: {
          amount: input.amount,
          category_name: input.category_name,
          name: input.name,
          date: input.date,
        },
      });
    }),
  getAllExpenses: publicProcedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {
      await ctx.prisma.expense.findMany();
    }),
  deleteExpense: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.expense.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
