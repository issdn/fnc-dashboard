import type { FC } from "react";
import CategoryForm from "./CategoryForm";
import Table from "./Table";
import { api } from "~/utils/api";
import ExpenseForm from "./ExpenseForm";
import { useCalendar } from "../standard-components/Datepicker/hooks";

const Dashboard: FC = () => {
  const ctx = api.useContext();
  const { mutateAsync } = api.category.add.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
    },
  });
  const { mutate: mutateExpense } = api.expense.addExpense.useMutation();
  const calendar = useCalendar({});
  return (
    <div className="flex w-full flex-row items-center justify-center overflow-y-auto px-8">
      <div className="flex w-full flex-col gap-y-4">
        <div className="rounded-2xl border-2 border-neutral-900 p-4 md:p-8">
          <ExpenseForm
            calendar={calendar}
            onSubmit={mutateExpense}
            initialValues={{
              date: calendar.date.toDate(),
              amount: 0,
              category_name: "",
              name: "",
            }}
          />
        </div>
        <div className="rounded-2xl border-2 border-neutral-900 p-4 md:p-8">
          <CategoryForm
            onSubmit={mutateAsync}
            initialValues={{ name: "", monthly_treshold: 0 }}
          />
        </div>
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
