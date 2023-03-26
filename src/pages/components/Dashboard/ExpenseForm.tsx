import type { FC } from "react";
import IconButton from "../IconButton";
import type { Expense } from "@prisma/client";
import { ErrorMessage, Field, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type CreateExpense = Omit<Expense, "id">;

type ExpenseFormProps = {
  onSubmit: (values: CreateExpense) => void;
  initialValues: CreateExpense;
};

export const ExpenseValidationSchema = z.object({
  amount: z.number().positive(),
  name: z.string(),
  date: z.date(),
});

const ExpenseForm: FC<ExpenseFormProps> = ({ onSubmit, initialValues }) => {
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
              <label htmlFor="Expense">Expense name:</label>
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
              <label htmlFor="monthly_treshold">Threshold:</label>
              <Field
                className="input-primary"
                name="monthly_treshold"
                placeholder="Monthly Treshold"
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

export default ExpenseForm;
