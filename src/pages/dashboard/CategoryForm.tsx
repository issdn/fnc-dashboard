import { z } from "zod";

import Input from "~/pages/StandardComponents/Input";
import type { CategoryDTO } from "./types";
import Form, { FormProps } from "./Form";

type CategoryFormProps<T extends CategoryDTO> = Omit<
  FormProps<T>,
  "children" | "validationSchema"
>;

export const validationSchema = z.object({
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

const CategoryForm = <T extends CategoryDTO>({
  initialValues,
  onSubmit,
  submitButtonContent,
  successMessage,
  errorMessage,
  successCallback,
}: CategoryFormProps<T>) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      submitButtonContent={submitButtonContent}
      successMessage={successMessage}
      errorMessage={errorMessage}
      successCallback={successCallback}
    >
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
    </Form>
  );
};

export default CategoryForm;
