import { type NextPage } from "next";
import Head from "next/head";
import MainLayout from "./MainLayout";
import CategoryTable from "./dashboard/FilteredTable";
import { api } from "~/utils/api";
import { useCalendar } from "./StandardComponents/Datepicker/hooks";
import ExpenseForm from "./dashboard/ExpenseForm";
import Icon from "./StandardComponents/Icon";
import CategoryForm from "./dashboard/CategoryForm";
import { useToastContext } from "./StandardComponents/Toast/toastContext";
import type { TRPCError } from "@trpc/server";
import { useSelectTr } from "./dashboard/Tr";
import type { Category } from "@prisma/client";
import ExpensePanel from "./dashboard/ExpensePanel";

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
          <div className="flex w-full flex-col items-start gap-y-8 gap-x-8 xl:flex-row">
            <ExpensePanel />
          </div>
          <fieldset className="w-full flex-1 rounded-2xl border-2 border-neutral-900 p-4 md:p-6">
            <legend className="mx-2 px-2 text-xl">New Category</legend>
            <CategoryForm
              onSubmit={(values) =>
                mutateCategory(values)
                  .then(() =>
                    addToast({
                      title: "Category added successfully",
                      type: "success",
                    })
                  )
                  .catch((reason: TRPCError) => {
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
