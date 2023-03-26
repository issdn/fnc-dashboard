import type { FC } from "react";
import IconButton from "../IconButton";
import type { Category } from "@prisma/client";
import { Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Input from "./Input";

type CreateCategory = Omit<Category, "id">;

type CategoryFormProps = {
  onSubmit: (values: CreateCategory) => void;
  initialValues: CreateCategory;
};

export const categoryValidationSchema = z.object({
  name: z
    .string({ required_error: "Category name is required." })
    .min(1, { message: "Name must be at least 1 character long." })
    .regex(/^[a-zA-Z\s]*$/, { message: "Only letters are allowed." }),
  monthly_treshold: z.preprocess(
    (v) => Number(v),
    z
      .number({ invalid_type_error: "Threshold must be a positive number." })
      .nonnegative()
  ),
});

const CategoryForm: FC<CategoryFormProps> = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(categoryValidationSchema)}
      onSubmit={(values: CreateCategory) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-y-4">
            <Input
              label="Category Name:"
              type="text"
              name="name"
              placeholder="Category name"
            />

            <Input
              label="Treshold:"
              type="text"
              name="monthly_treshold"
              placeholder="Monthly treshold"
            />

            <IconButton
              style="primary"
              icon="add"
              attributes={{ disabled: isSubmitting }}
              iconClassName="text-3xl"
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CategoryForm;
