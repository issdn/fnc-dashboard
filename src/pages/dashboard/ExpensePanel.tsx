import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Tr, { useSelectTr } from "./Tr";
import { TRPCError } from "@trpc/server/dist/error/TRPCError";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import { Category } from "@prisma/client";
import { api } from "~/utils/api";
import ExpenseForm from "./ExpenseForm";
import Icon from "../StandardComponents/Icon";
import FilteredTable from "./FilteredTable";
import { useCalendar } from "../StandardComponents/Datepicker/hooks";
import EditButton from "./EditButton";
import CategoryForm from "./CategoryForm";
import DeleteButton from "./DeleteButton";
import Spinner from "../StandardComponents/Spinner";

const ExpensePanel: FC = () => {
  const { addToast } = useToastContext();
  const calendar = useCalendar({});
  const [tableData, setTableData] = useState<Category[]>([]);
  const { selectedTr, selectTr } = useSelectTr<Category>();

  const ctx = api.useContext();
  const result = api.category.getAll.useQuery();

  const { mutateAsync: deleteCategory } = api.category.delete.useMutation({
    onSuccess: async () => await ctx.category.invalidate(),
  });
  const { mutateAsync: editCategory } = api.category.edit.useMutation({
    onSuccess: async () => await ctx.category.invalidate(),
  });

  const { mutateAsync: mutateExpense } = api.expense.add.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
    },
  });

  useEffect(() => {
    if (result.data) {
      setTableData(result.data);
      selectTr(result.data[0] || null);
    }
  }, [result.data]);

  if (result.isError) {
    return (
      <div className="flex w-full flex-row items-center justify-center">
        <p>❌ Couldn&#39;t load expenses data.</p>;
      </div>
    );
  }

  if (result.isLoading) {
    return (
      <div className="flex w-full flex-row items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <fieldset className="w-full rounded-2xl border-2 border-neutral-900 p-4 md:p-6 xl:h-full ">
        <legend className="mx-2 px-2 text-xl">New Expense</legend>
        <ExpenseForm
          selectedTr={selectedTr}
          submitButtonContent={<Icon icon="add" className="text-3xl" />}
          calendar={calendar}
          onSubmit={(values) =>
            selectedTr
              ? mutateExpense({
                  ...values,
                  category_name: selectedTr?.name,
                }).catch((err: TRPCError) => {
                  addToast({
                    title: err.message,
                    type: "error",
                  });
                })
              : new Promise(() =>
                  addToast({
                    title: "You have to select a category first.",
                    type: "error",
                  })
                )
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
        <div className="top-0 left-0 h-full w-full xl:absolute">
          <FilteredTable
            filterKey="name"
            data={result.data}
            setData={
              setTableData as Dispatch<
                SetStateAction<Record<string, string | number>[]>
              >
            }
          >
            <thead className="text-center">
              <tr>
                <th className="px-2 py-4">Category</th>
                <th className="px-2 py-4">Monthly Treshold</th>
                <th className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bolder w-full">
              {tableData.map((category, index) => (
                <Tr
                  category={{
                    name: category.name,
                    monthly_treshold: category.monthly_treshold,
                  }}
                  index={index}
                  key={category.id}
                  onClick={() => {
                    selectTr(category);
                  }}
                  selected={selectedTr?.id === category.id}
                >
                  <EditButton
                    className="rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10"
                    editForm={
                      <CategoryForm
                        successMessage="Category updated successfully."
                        errorMessage="Couldn't update category."
                        submitButtonContent={
                          <Icon icon="edit" className="text-3xl" />
                        }
                        onSubmit={(newValues) =>
                          editCategory({
                            id: category.id,
                            ...(newValues as {
                              name: string;
                              monthly_treshold: number;
                            }),
                          })
                        }
                        initialValues={{
                          name: category.name,
                          monthly_treshold: category.monthly_treshold,
                        }}
                      />
                    }
                  />
                  <DeleteButton
                    className="rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10"
                    successMessage="Category deleted successfully."
                    errorMessage="Couldn't delete category."
                    onDelete={async () => {
                      await deleteCategory({ id: category.id });
                    }}
                    deleteModalContent={
                      <h1 className="text-center">
                        Are you sure you want to delete <br />
                        <strong>{category.name}</strong> category?
                      </h1>
                    }
                  />
                </Tr>
              ))}
            </tbody>
          </FilteredTable>
        </div>
      </div>
    </>
  );
};

export default ExpensePanel;
