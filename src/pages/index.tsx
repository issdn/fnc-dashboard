import { type NextPage } from "next";
import Head from "next/head";
import MainLayout from "./MainLayout";
import CategoryTable from "./dashboard/CategoryTable";
import { api } from "~/utils/api";
import { useCalendar } from "./StandardComponents/Datepicker/hooks";
import ExpenseForm from "./dashboard/ExpenseForm";
import Icon from "./StandardComponents/Icon";
import CategoryForm from "./dashboard/CategoryForm";
import { useToastContext } from "./StandardComponents/Toast/toastContext";
import type { TRPCError } from "@trpc/server";
import { useSelectTr } from "./dashboard/EditableTr";
import { Category } from "@prisma/client";

const Home: NextPage = () => {
  const { addToast } = useToastContext();
  const { selectedTr, selectTr } = useSelectTr<Category>();

  const ctx = api.useContext();
  const { mutateAsync: mutateCategory } = api.category.add.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
    },
  });

  const { mutateAsync: mutateExpense } = api.expense.add.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
    },
  });

  const calendar = useCalendar({});
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout>
        <div className="flex h-full w-full flex-col gap-y-8 gap-x-8 overflow-y-auto md:p-8">
          <div className="flex flex-row items-start gap-x-8">
            <fieldset className="h-full rounded-2xl border-2 border-neutral-900 p-4 md:p-6 ">
              <legend className="mx-2 px-2 text-xl">New Expense</legend>
              <ExpenseForm
                submitButtonContent={<Icon icon="add" className="text-3xl" />}
                calendar={calendar}
                onSubmit={(values) =>
                  mutateExpense({ ...values, category_name: selectedTr?.name })
                }
                initialValues={{
                  date: calendar.date.toDate(),
                  amount: 0,
                  category_name: "",
                  name: "",
                }}
              />
            </fieldset>
            <div className="relative h-full w-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-full">
                <CategoryTable selectedTr={selectedTr} selectTr={selectTr} />
              </div>
            </div>
          </div>
          <fieldset className="w-full flex-1 rounded-2xl border-2 border-neutral-900 p-4 md:p-6">
            <legend className="mx-2 px-2 text-xl">New Category</legend>
            <CategoryForm
              onSubmit={(values) =>
                mutateCategory(values).catch((reason: TRPCError) => {
                  addToast({ title: reason.message, type: "error" });
                })
              }
              initialValues={{ name: "", monthly_treshold: 0 }}
              submitButtonContent={<Icon icon="add" className="text-3xl" />}
            />
          </fieldset>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
