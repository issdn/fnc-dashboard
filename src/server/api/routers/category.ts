import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.object({ name: z.string(), monthly_treshold: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.category.create({
        data: {
          name: input.name.toLowerCase(),
          monthly_treshold: parseFloat(input.monthly_treshold.toPrecision(2)),
        },
      });
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        monthly_treshold: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.category.update({
        where: { id: input.id },
        data: {
          name: input.name.toLowerCase(),
          monthly_treshold: parseFloat(input.monthly_treshold.toPrecision(2)),
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.category.delete({
        where: { id: input.id },
      });
    }),
});
