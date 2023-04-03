import type { TRPCError } from "@trpc/server/dist/error/TRPCError";
import Icon from "../StandardComponents/Icon";
import CategoryForm from "./CategoryForm";
import { api } from "~/utils/api";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import FilteredTable from "./FilteredTable";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Tr from "./Tr";
import DeleteButton from "../StandardComponents/DeleteButton";
import type { Expense } from "@prisma/client";
import Spinner from "../StandardComponents/Spinner";
import EditButton from "../StandardComponents/EditButton";
import ExpenseForm from "./ExpenseForm";
import { useCalendar } from "../StandardComponents/Datepicker/hooks";
import dayjs from "dayjs";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";
import DeleteModal from "../StandardComponents/DeleteModal";

const CategoryPanel = () => {
  const {
    isOpen: isEditOpenModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const {
    isOpen: isDeleteOpenModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const { addToast } = useToastContext();
  const calendar = useCalendar({});
  const [tableData, setTableData] = useState<Expense[]>([]);
  const [expenseToMutate, setExpenseToMutate] = useState<Expense | null>(null);

  const ctx = api.useContext();
  const result = api.expense.getAll.useQuery();

  const { mutateAsync: deleteExpense } = api.expense.delete.useMutation({
    onSuccess: async () => await ctx.expense.invalidate(),
  });
  const { mutateAsync: editExpense } = api.expense.edit.useMutation({
    onSuccess: async () => await ctx.expense.invalidate(),
  });

  const { mutateAsync: addCategory } = api.category.add.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
    },
  });

  useEffect(() => {
    if (result.data) {
      setTableData(result.data);
    }
  }, [result.data]);

  if (result.isError) {
    return (
      <div className="flex h-full w-full flex-row items-center justify-center">
        <p>❌ Couldn&#39;t load expenses data.</p>;
      </div>
    );
  }
  1;

  if (result.isLoading) {
    return (
      <div className="flex h-full w-full flex-row items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <fieldset className="h-full w-full flex-1 rounded-2xl border-2 border-neutral-900 p-4 md:p-6">
        <legend className="mx-2 px-2 text-xl">New Category</legend>
        <CategoryForm
          onSubmit={(values) =>
            addCategory(values)
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
      <div className="relative h-full w-full overflow-hidden">
        <div className="top-0 left-0 h-full w-full xl:absolute">
          <FilteredTable
            filterKey="name"
            data={result.data}
            setData={
              setTableData as Dispatch<
                SetStateAction<Record<string, string | number | Date>[]>
              >
            }
          >
            <thead className="text-center">
              <tr>
                <th className="px-2 py-4">Date</th>
                <th className="px-2 py-4">Name</th>
                <th className="px-2 py-4">Amount</th>
                <th className="px-2 py-4">Category</th>
              </tr>
            </thead>
            <tbody className="font-bolder w-full">
              {tableData.map((expense, index) => (
                <Tr
                  row={{
                    date: dayjs(expense.date).format(calendar.format),
                    name: expense.name,
                    amount: expense.amount,
                    category_name: expense.category_name,
                  }}
                  index={index}
                  key={expense.id}
                >
                  <EditButton
                    onClick={() => {
                      setExpenseToMutate(expense);
                      openEditModal();
                    }}
                    className="rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10"
                  />

                  <DeleteButton
                    className="rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10"
                    onClick={() => {
                      setExpenseToMutate(expense);
                      openDeleteModal();
                    }}
                  />
                </Tr>
              ))}
            </tbody>
          </FilteredTable>
        </div>
      </div>
      <Modal isOpen={isEditOpenModal} closeModal={closeEditModal}>
        <ExpenseForm
          calendar={calendar}
          successMessage="Category updated successfully."
          errorMessage="Couldn't update category."
          submitButtonContent={<Icon icon="edit" className="text-3xl" />}
          onSubmit={(newValues) =>
            editExpense({
              id: expenseToMutate?.id || "0",
              ...(newValues as {
                date: Date;
                name: string;
                amount: number;
                category_name: string;
              }),
            })
          }
          initialValues={{
            date: expenseToMutate?.date || new Date(),
            name: expenseToMutate?.name || "",
            amount: expenseToMutate?.amount || 0,
            category_name: expenseToMutate?.category_name || "",
          }}
        />
      </Modal>
      <DeleteModal
        isDeleteOpenModal={isDeleteOpenModal}
        closeDeleteModal={closeDeleteModal}
        onSuccessMessage="Category deleted successfully."
        onErrorMessage="Couldn't delete category."
        onDelete={async () => {
          await deleteExpense({ id: expenseToMutate?.id || "0" });
        }}
      >
        <h1 className="text-center">
          Are you sure you want to delete <br />
          <strong>{expenseToMutate?.name || ""}</strong> category?
        </h1>
      </DeleteModal>
    </>
  );
};

export default CategoryPanel;
