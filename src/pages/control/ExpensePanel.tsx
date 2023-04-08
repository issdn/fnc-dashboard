import type { FC } from "react";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import { api } from "~/utils/api";
import ExpenseForm from "./ExpenseForm";
import Icon from "../StandardComponents/Icon";
import { useCalendar } from "../StandardComponents/Datepicker/hooks";
import Fieldset from "../StandardComponents/Fieldset";
import type { Category } from "@prisma/client";
import { useSelectTr } from "../StandardComponents/Tr";

type ExpensePanelProps = {
  selectedCategory: ReturnType<typeof useSelectTr<Category>>["selectedTr"];
};

const initialValues = {
  date: new Date(),
  amount: 0,
  category_name: "",
  name: "",
};

const ExpensePanel: FC<ExpensePanelProps> = ({ selectedCategory }) => {
  const { addToast } = useToastContext();
  const calendar = useCalendar({});

  const ctx = api.useContext();

  const { mutateAsync: addExpense } = api.expense.add.useMutation({
    onSuccess: async () => {
      await ctx.expense.getAll.invalidate();
      addToast({
        title: "Expense added successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addToast({ title: error.message, type: "error" });
    },
  });

  return (
    <Fieldset legend="New Expense">
      <ExpenseForm
        submitButtonContent={<Icon icon="add" className="text-3xl" />}
        calendar={calendar}
        onSubmit={(values) =>
          selectedCategory
            ? addExpense({
                ...values,
                category_name: selectedCategory.name,
              })
            : new Promise(() =>
                addToast({
                  title: "You have to select a category first.",
                  type: "error",
                })
              )
        }
        initialValues={initialValues}
      >
        <p className="text-2">
          Category:{" "}
          <b className="break-all">
            {selectedCategory?.name || "Select a category to add an expense."}
          </b>
        </p>
      </ExpenseForm>
    </Fieldset>
  );
};

export default ExpensePanel;
