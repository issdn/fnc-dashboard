import { useToastContext } from "../StandardComponents/Toast/toastContext";
import { api } from "~/utils/api";
import Icon from "../StandardComponents/Icon";
import CategoryForm from "./CategoryForm";
import Fieldset from "../StandardComponents/Fieldset";
import IncomeForm from "./IncomeForm";
import { type FC } from "react";
import { useCalendar } from "../StandardComponents/Datepicker/datepicker_hooks";

const categoryInitialValues = { name: "", monthly_treshold: 0 };
const incomeInitialValues = { name: "", amount: 0, date: new Date() };

const CategoryIncomePanel: FC = () => {
  const calendar = useCalendar({});
  const { addToast } = useToastContext();
  const ctx = api.useContext();

  const { mutateAsync: addCategory } = api.category.add.useMutation({
    onSuccess: async () => {
      await ctx.category.getAll.invalidate();
      addToast({
        title: "Category added successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addToast({ title: error.message, type: "error" });
    },
  });

  const { mutateAsync: addIncome } = api.income.add.useMutation({
    onSuccess: async () => {
      await ctx.income.getLast.invalidate();
      await ctx.income.getHistory.invalidate();
      addToast({
        title: "Income added successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addToast({ title: error.message, type: "error" });
    },
  });

  return (
    <>
      <Fieldset legend="New Category">
        <CategoryForm
          onSubmit={async (values) => await addCategory(values)}
          initialValues={categoryInitialValues}
          submitButtonContent={<Icon icon="add" className="text-3xl" />}
        />
      </Fieldset>
      <Fieldset legend="New Income">
        <IncomeForm
          calendar={calendar}
          onSubmit={async (values) => await addIncome(values)}
          initialValues={incomeInitialValues}
          submitButtonContent={<Icon icon="add" className="text-3xl" />}
        />
      </Fieldset>
    </>
  );
};

export default CategoryIncomePanel;
