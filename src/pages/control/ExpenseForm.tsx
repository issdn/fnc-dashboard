import { z } from "zod";
import Input from "~/pages/StandardComponents/Input";
import Form from "../StandardComponents/Form";
import type { FormProps } from "../StandardComponents/Form";
import type { Expense } from "@prisma/client";
import { useCalendar } from "../StandardComponents/Datepicker/datepicker_hooks";
import Datepicker from "../StandardComponents/Datepicker/Datepicker";

type ExpenseDTO = Omit<Expense, "id" | "category_name">;

type ExpenseFormProps<T extends ExpenseDTO> = Omit<
  FormProps<T>,
  "validationSchema"
> & { calendar: ReturnType<typeof useCalendar> };

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

const ExpenseForm = <T extends ExpenseDTO>({
  initialValues,
  onSubmit,
  submitButtonContent,
  children,
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
      {children}
      <Datepicker name="date" calendar={calendar} />
    </Form>
  );
};

export default ExpenseForm;
