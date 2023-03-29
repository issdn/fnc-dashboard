import type { FC } from "react";

import { api } from "~/utils/api";
import { useCalendar } from "../standard-components/Datepicker/hooks";
import ExpenseForm from "../dashboard/ExpenseForm";
import Icon from "../standard-components/Icon";

const Dashboard: FC = () => {
  const ctx = api.useContext();
  const { mutateAsync } = api.expense.add.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
    },
  });
  const calendar = useCalendar({});
  return (
    <div className="flex w-full flex-row items-center justify-center overflow-y-auto px-8">
      <div className="flex w-full flex-col gap-y-4">
        <div className="rounded-2xl border-2 border-neutral-900 p-4 md:p-8">
          <ExpenseForm
            submitButtonContent={<Icon icon="add" />}
            calendar={calendar}
            onSubmit={mutateAsync}
            initialValues={{
              date: calendar.date.toDate(),
              amount: 0,
              category_name: "",
              name: "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
