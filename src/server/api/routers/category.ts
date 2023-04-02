import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const findCategory = async (prismaClient: PrismaClient, name: string) =>
  await prismaClient.category.findUnique({
    where: { name: name.toLowerCase() },
  });

// TODO: Catch necessary errors
export const categoryRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({ name: z.string(), monthly_treshold: z.number().nonnegative() })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await findCategory(ctx.prisma, input.name || "");
      if (category) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Category with this name already exists.",
        });
      }
      return await ctx.prisma.category.create({
        data: {
          name: (input.name || "").toLowerCase(),
          monthly_treshold: input.monthly_treshold,
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
      const category = await findCategory(ctx.prisma, input.name);
      if (category) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Category with this name already exists.",
        });
      }
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
