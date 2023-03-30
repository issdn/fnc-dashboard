import { z } from "zod";

import Input from "~/pages/StandardComponents/Input";
import Form from "./Form";
import type { FormProps } from "./Form";
import type { Expense } from "@prisma/client";
import { useCalendar } from "../StandardComponents/Datepicker/hooks";
import Datepicker from "../StandardComponents/Datepicker/Datepicker";

type ExpenseDTO = Omit<Expense, "id">;

type ExpenseFormProps<T extends ExpenseDTO> = Omit<
  FormProps<T>,
  "children" | "validationSchema"
> & { calendar: ReturnType<typeof useCalendar> };

export const categoryValidationSchema = z.object({
  name: z.string().optional(),
  amount: z.preprocess(
    (v) => Number(v),
    z
      .number({ invalid_type_error: "Threshold must be a positive number." })
      .nonnegative()
  ),
  category_name: z.string(),
  date: z.date(),
});

const CategoryForm = <T extends ExpenseDTO>({
  initialValues,
  onSubmit,
  submitButtonContent,
}: ExpenseFormProps<T>) => {
  const calendar = useCalendar({});

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={categoryValidationSchema}
      submitButtonContent={submitButtonContent}
    >
      <Input
        label="Expense name:"
        type="text"
        name="name"
        placeholder="Expense name"
      />
      <Input
        label="Amount:"
        type="text"
        name="amount"
        placeholder="Monthly treshold"
      />
      <Input
        label="Category:"
        type="text"
        name="category_name"
        placeholder="Category"
      />

      <Datepicker name="date" calendar={calendar} />
    </Form>
  );
};

export default CategoryForm;
