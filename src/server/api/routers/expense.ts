import dayjs from "dayjs";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const expenseRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        amount: z.number().nonnegative(),
        category_name: z.string().min(1).optional(),
        name: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.expense.create({
        data: {
          amount: input.amount,
          category_name: input.category_name || "",
          name: input.name,
          date: input.date,
        },
      });
    }),
  addBatch: publicProcedure
    .input(
      z.array(
        z.object({
          amount: z.number().nonnegative(),
          category_name: z.string(),
          name: z.string(),
          date: z.date(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.expense.createMany({
        data: input,
      });
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        amount: z.number().nonnegative(),
        category_name: z.string().min(1),
        name: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.expense.update({
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
  getAll: publicProcedure.query(async ({ ctx }) => {
    const currDate = dayjs();
    return await ctx.prisma.expense.findMany({
      where: {
        date: {
          gte: currDate.date(0).toDate(),
          lte: currDate.date(currDate.daysInMonth()).toDate(),
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.expense.delete({
      where: {
        id: input,
      },
    });
  }),
});
