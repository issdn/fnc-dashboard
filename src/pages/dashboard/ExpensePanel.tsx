import { useEffect, useState } from "react";
import type { Dispatch, FC, SetStateAction } from "react";
import Tr, { useSelectTr } from "./Tr";
import type { TRPCError } from "@trpc/server/dist/error/TRPCError";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import type { Category } from "@prisma/client";
import { api } from "~/utils/api";
import ExpenseForm from "./ExpenseForm";
import Icon from "../StandardComponents/Icon";
import FilteredTable from "./FilteredTable";
import { useCalendar } from "../StandardComponents/Datepicker/hooks";
import EditButton from "./EditButton";
import CategoryForm from "./CategoryForm";
import DeleteButton from "./DeleteButton";
import Spinner from "../StandardComponents/Spinner";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";
import DeleteModal from "./DeleteModal";

const ExpensePanel: FC = () => {
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
  const [tableData, setTableData] = useState<Category[]>([]);
  const { selectedTr, selectTr } = useSelectTr<Category>();
  const [categoryToMutate, setCategoryToMutate] = useState<Category | null>(
    null
  );

  const ctx = api.useContext();
  const result = api.category.getAll.useQuery();

  const { mutateAsync: deleteCategory } = api.category.delete.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
    },
  });

  const { mutateAsync: editCategory } = api.category.edit.useMutation({
    onSuccess: async () => await ctx.category.invalidate(),
  });

  const { mutateAsync: addExpense } = api.expense.add.useMutation({
    onSuccess: async () => {
      await ctx.expense.invalidate();
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
      <div className="flex h-full w-full flex-row items-center justify-center">
        <p>❌ Couldn&#39;t load expenses data.</p>;
      </div>
    );
  }

  if (result.isLoading) {
    return (
      <div className="flex h-full w-full flex-row items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <fieldset className="w-full rounded-2xl border-2 border-neutral-900 p-4 md:p-6 xl:h-full ">
        <legend className="mx-2 px-2 text-xl">New Expense</legend>
        <ExpenseForm
          submitButtonContent={<Icon icon="add" className="text-3xl" />}
          calendar={calendar}
          onSubmit={(values) =>
            selectedTr
              ? addExpense({
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
        >
          <p className="text-2">
            Category: <b className="break-all">{selectedTr?.name || "---"}</b>
          </p>
        </ExpenseForm>
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
                  row={{
                    name: category.name,
                    monthly_treshold: category.monthly_treshold,
                  }}
                  index={index}
                  key={category.id}
                  onClick={() => {
                    selectTr(category);
                  }}
                  selected={selectedTr?.id === category.id}
                  className="cursor-pointer"
                >
                  <EditButton
                    className="rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10"
                    onClick={() => {
                      setCategoryToMutate(category);
                      openEditModal();
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      setCategoryToMutate(category);
                      openDeleteModal();
                    }}
                    className="rounded-xl text-base text-neutral-100 outline-neutral-100 hover:bg-white/10"
                  />
                </Tr>
              ))}
            </tbody>
          </FilteredTable>
        </div>
      </div>
      <Modal isOpen={isEditOpenModal} closeModal={closeEditModal}>
        <CategoryForm
          successMessage="Category updated successfully."
          errorMessage="Couldn't update category."
          submitButtonContent={<Icon icon="edit" className="text-3xl" />}
          onSubmit={(newValues) =>
            editCategory({
              id: categoryToMutate?.id || "0",
              ...(newValues as {
                name: string;
                monthly_treshold: number;
              }),
            })
          }
          initialValues={{
            name: categoryToMutate?.name || "",
            monthly_treshold: categoryToMutate?.monthly_treshold || 0,
          }}
        />
      </Modal>
      <DeleteModal
        isDeleteOpenModal={isDeleteOpenModal}
        closeDeleteModal={closeDeleteModal}
        onSuccessMessage="Category deleted successfully."
        onErrorMessage="Couldn't delete category."
        onDelete={async () =>
          await deleteCategory({ id: categoryToMutate?.id || "0" })
        }
      >
        <h1 className="text-center">
          Are you sure you want to delete <br />
          <strong>{categoryToMutate?.name}</strong> category?
        </h1>
      </DeleteModal>
    </>
  );
};

export default ExpensePanel;
