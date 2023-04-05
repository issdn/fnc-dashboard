import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

export const createSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson,
  });
