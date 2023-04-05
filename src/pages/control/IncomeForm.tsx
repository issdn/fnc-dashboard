import Form, { type FormProps } from "../StandardComponents/Form";
import { z } from "zod";
import type { Income } from "@prisma/client";
import Input from "../StandardComponents/Input";
import { type useCalendar } from "../StandardComponents/Datepicker/hooks";
import Datepicker from "../StandardComponents/Datepicker/Datepicker";

type IncomeFormProps<T extends Omit<Income, "id">> = Omit<
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

const IncomeForm = <T extends Omit<Income, "id">>({
  initialValues,
  onSubmit,
  submitButtonContent,
  calendar,
}: IncomeFormProps<T>) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      submitButtonContent={submitButtonContent}
    >
      <Input
        label="Income name:"
        type="text"
        name="name"
        placeholder="Income Name"
      />
      <Input label="Amount:" type="text" name="amount" placeholder="Amount" />
      <Datepicker name="date" calendar={calendar} />
    </Form>
  );
};

export default IncomeForm;
