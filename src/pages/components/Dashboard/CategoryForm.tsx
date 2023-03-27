import type { FC } from "react";
import IconButton from "../IconButton";
import type { Category } from "@prisma/client";
import { Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Input from "./Input";
import { api } from "~/utils/api";

type CreateCategory = Omit<Category, "id">;

type CategoryFormProps = {
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

const CategoryForm: FC<CategoryFormProps> = ({ initialValues }) => {
  const ctx = api.useContext();
  const { mutateAsync } = api.category.addCategory.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
    },
  });

  return (
    <Formik<Omit<Category, "id">>
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(categoryValidationSchema)}
      onSubmit={async (values, actions) =>
        mutateAsync(values).then((data) => {
          actions.resetForm();
          console.log(data);
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
            <IconButton
              type="primary"
              icon="add"
              attributes={{ disabled: isSubmitting, type: "submit" }}
              iconClassName="text-3xl"
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CategoryForm;
