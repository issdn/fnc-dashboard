import type { FC } from "react";
import type { Category } from "@prisma/client";
import { Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import Input from "~/pages/standard-components/Input";
import Button from "~/pages/standard-components/Button";
import type { UseBaseMutationResult } from "@tanstack/react-query";
import type { CategoryDTO } from "./types";
import Icon from "../standard-components/Icon";

type CreateCategory = Omit<Category, "id">;

type CategoryFormProps = {
  initialValues: CreateCategory;
  onSubmit: UseBaseMutationResult<
    CategoryDTO,
    unknown,
    CategoryDTO
  >["mutateAsync"];
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

const CategoryForm: FC<CategoryFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <Formik<Omit<Category, "id">>
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(categoryValidationSchema)}
      onSubmit={(values, actions) =>
        onSubmit(values).then(() => {
          actions.resetForm();
        })
      }
    >
      {({ isSubmitting, handleSubmit, setSubmitting }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setSubmitting(false);
          }}
        >
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
            <Button
              type="primary"
              attributes={{ disabled: isSubmitting, type: "submit" }}
            >
              <Icon icon="add" className="text-3xl" />
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CategoryForm;
