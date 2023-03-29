import type { Category } from "@prisma/client";

export type CategoryDTO = Omit<Category, "id">;
export type CategoryId = Category["id"];
