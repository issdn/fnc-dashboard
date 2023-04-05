import { createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "~/server/api/routers/category";
import { expenseRouter } from "./routers/expense";
import { incomeRouter } from "./routers/income";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  category: categoryRouter,
  expense: expenseRouter,
  income: incomeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
