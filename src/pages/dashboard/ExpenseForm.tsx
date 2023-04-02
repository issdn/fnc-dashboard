import { z } from "zod";

import Input from "~/pages/StandardComponents/Input";
import Form from "./Form";
import type { FormProps } from "./Form";
import type { Category, Expense } from "@prisma/client";
import { useCalendar } from "../StandardComponents/Datepicker/hooks";
import Datepicker from "../StandardComponents/Datepicker/Datepicker";

type ExpenseDTO = Omit<Expense, "id">;

type ExpenseFormProps<T extends ExpenseDTO> = Omit<
  FormProps<T>,
  "children" | "validationSchema"
> & { calendar: ReturnType<typeof useCalendar>; selectedTr: Category | null };

export const validationSchema = z.object({
  name: z.string().optional(),
  amount: z.preprocess(
    (v) => Number(v),
    z
      .number({ invalid_type_error: "Amount must be a positive number." })
      .nonnegative()
  ),
  date: z.date(),
});

const CategoryForm = <T extends ExpenseDTO>({
  initialValues,
  onSubmit,
  submitButtonContent,
  selectedTr,
}: ExpenseFormProps<T>) => {
  const calendar = useCalendar({});

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      submitButtonContent={submitButtonContent}
    >
      <Input
        label="Expense name:"
        type="text"
        name="name"
        placeholder="Expense name"
      />
      <Input label="Amount:" type="text" name="amount" placeholder="Amount" />
      <p className="text-2">
        Category: <b className="break-all">{selectedTr?.name || "---"}</b>
      </p>
      <Datepicker name="date" calendar={calendar} />
    </Form>
  );
};

export default CategoryForm;
