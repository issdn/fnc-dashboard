import type { FC } from "react";
import IconButton from "../IconButton";
import type { Expense } from "@prisma/client";
import { ErrorMessage, Field, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Datepicker from "./Datepicker/Datepicker";
import type { useCalendar } from "./Datepicker/hooks";

type CreateExpense = Omit<Expense, "id">;

type ExpenseFormProps = {
  onSubmit: (values: CreateExpense) => void;
  initialValues: CreateExpense;
  calendar: ReturnType<typeof useCalendar>;
};

export const ExpenseValidationSchema = z.object({
  amount: z.preprocess(
    (v) => Number(v),
    z
      .number({ invalid_type_error: "Threshold must be a positive number." })
      .nonnegative()
  ),
  name: z.string({ required_error: "Expense name is required." }),
  date: z.date(),
});

const ExpenseForm: FC<ExpenseFormProps> = ({
  onSubmit,
  initialValues,
  calendar,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(ExpenseValidationSchema)}
      onSubmit={(values: CreateExpense) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name">Name: </label>
              <Field
                className="input-primary"
                type="text"
                name="name"
                placeholder="Expense name"
              />
              <ErrorMessage
                className="text-sm text-red-600"
                name="name"
                component="p"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="amount">Amount: </label>
              <Field
                className="input-primary"
                name="amount"
                placeholder="Monthly Treshold"
              />
              <ErrorMessage
                className="text-sm text-red-600"
                name="amount"
                component="p"
              />
            </div>
            <Datepicker name="date" calendar={calendar} />
            <IconButton
              type="primary"
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

export default ExpenseForm;
