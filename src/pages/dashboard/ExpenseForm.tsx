import { z } from "zod";

import Input from "~/pages/standard-components/Input";
import Form from "./Form";
import type { FormProps } from "./Form";
import type { Expense } from "@prisma/client";
import type { useCalendar } from "../standard-components/Datepicker/hooks";

type ExpenseDTO = Omit<Expense, "id">;

type ExpenseFormProps<T extends ExpenseDTO> = Omit<
  FormProps<T>,
  "children" | "validationSchema"
> & { calendar: ReturnType<typeof useCalendar> };

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

const CategoryForm = <T extends ExpenseDTO>({
  initialValues,
  onSubmit,
  submitButtonContent,
}: ExpenseFormProps<T>) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={categoryValidationSchema}
      submitButtonContent={submitButtonContent}
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
