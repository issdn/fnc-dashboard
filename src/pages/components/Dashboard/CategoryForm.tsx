import type { FC } from "react";
import IconButton from "../IconButton";
import type { Category } from "@prisma/client";
import { ErrorMessage, Field, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type CreateCategory = Omit<Category, "id">;

type CategoryFormProps = {
  onSubmit: (values: CreateCategory) => void;
  initialValues: CreateCategory;
};

export const categoryValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long." })
    .regex(/^[a-zA-Z\s]*$/, { message: "Only letters are allowed." }),
  monthly_treshold: z.preprocess(
    (v) => Number(v),
    z
      .number({ invalid_type_error: "Threshold must be a positive number." })
      .nonnegative()
      .min(1)
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
        <form>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="category">Category name:</label>
              <Field
                className="input-primary"
                type="text"
                name="name"
                props={{
                  placeholder: "Category name",
                  type: "text",
                  required: true,
                  minLength: 1,
                  maxLength: 128,
                }}
              />
              <ErrorMessage
                className="text-sm text-red-600"
                name="name"
                component="p"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="monthly_treshold">Threshold:</label>
              <Field
                className="input-primary"
                name="monthly_treshold"
                props={{
                  placeholder: "Monthly Treshold",
                  required: true,
                  inputMode: "decimal",
                  pattern: "[0-9.,]*",
                }}
              />
              <ErrorMessage
                className="text-sm text-red-600"
                name="monthly_treshold"
                component="p"
              />
            </div>
            <IconButton
              style="primary"
              icon="add"
              attributes={{ disabled: isSubmitting }}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CategoryForm;
