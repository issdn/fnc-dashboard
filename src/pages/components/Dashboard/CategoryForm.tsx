import type { FC } from "react";
import { useState } from "react";
import Input from "../Input";
import IconButton from "../IconButton";
import { api } from "~/utils/api";
import type { Category } from "@prisma/client";

type CreateCategory = Omit<Category, "id">;

const CategoryForm: FC = () => {
  const [newCategory, setNewCategory] = useState<CreateCategory>({
    name: "",
    monthly_treshold: 0,
  });

  const { mutate } = api.database.addCategory.useMutation();

  const addCategory = () => {
    try {
      mutate(newCategory);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addCategory();
      }}
    >
      <div className="flex flex-col gap-y-4 rounded-2xl border-2 border-orange-500 px-8 py-8">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="category">Category name:</label>
          <Input
            onChange={(e) => {
              setNewCategory({ ...newCategory, name: e.target.value });
            }}
            attributes={{
              placeholder: "Category name",
              name: "category",
              required: true,
              minLength: 1,
              maxLength: 128,
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="threshold">Threshold:</label>
          <Input
            onChange={(e) => {
              setNewCategory({
                ...newCategory,
                monthly_treshold: parseFloat(e.target.value),
              });
            }}
            attributes={{
              placeholder: "200.00",
              name: "threshold",
              required: true,
              inputMode: "decimal",
              pattern: "[0-9.,]*",
            }}
          />
        </div>
        <IconButton icon="add" />
      </div>
    </form>
  );
};

export default CategoryForm;
