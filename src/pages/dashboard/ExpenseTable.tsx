import type { Expense } from "@prisma/client";
import { api } from "~/utils/api";
import { useState, type FC } from "react";
import dayjs from "dayjs";
import EditButton from "../StandardComponents/EditButton";
import DeleteButton from "../StandardComponents/DeleteButton";
import FilteredTable, {
  useFilteredTableData,
} from "../StandardComponents/FilteredTable";
import ExpenseForm from "../control/ExpenseForm";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import { useCalendar } from "../StandardComponents/Datepicker/hooks";
import Icon from "../StandardComponents/Icon";
import Tbody from "../StandardComponents/Tbody";
import Thead from "../StandardComponents/Thead";
import Tr from "../StandardComponents/Tr";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";

const ExpenseTable: FC = () => {
  const { addToast } = useToastContext();
  const calendar = useCalendar({});

  const ctx = api.useContext();
  const { data, setData } = useFilteredTableData(
    api.expense.getAll.useQuery().data || []
  );

  const [expenseToEdit, setExpenseToEdit] = useState<Expense | undefined>(
    data[0]
  );
  const { isOpen, onOpen, onClose } = useModal();

  const { mutateAsync: deleteExpense } = api.expense.delete.useMutation({
    onSuccess: async () => {
      await ctx.category.invalidate();
      await ctx.expense.invalidate();
      addToast({ title: "Expense deleted successfully.", type: "success" });
    },
    onError: () => {
      addToast({
        title: "Couldn't delete expense.",
        type: "error",
      });
    },
  });

  const { mutateAsync: editExpense } = api.expense.edit.useMutation({
    onSuccess: async () => {
      onClose();
      await ctx.category.getAll.invalidate();
      await ctx.expense.getAll.invalidate();
      addToast({ title: "Expense updated successfully.", type: "success" });
    },
    onError: () => {
      addToast({
        title: "Couldn't update expense.",
        type: "error",
      });
    },
  });

  return (
    <>
      <FilteredTable<Expense> filterKey="name" data={data} setData={setData}>
        <Thead>
          <th>Date</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Category</th>
        </Thead>
        <Tbody>
          {data.map((expense, index) => (
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
                  setExpenseToEdit(expense);
                  onOpen();
                }}
              />
              <DeleteButton
                deleteModalContent={
                  <h1 className="text-center">
                    Are you sure you want to delete <br />
                    <strong>{expense.name}</strong> category?
                  </h1>
                }
                onDelete={async () => {
                  await deleteExpense(expense.id);
                }}
              />
            </Tr>
          ))}
        </Tbody>
      </FilteredTable>
      <Modal onClose={onClose} isOpen={isOpen}>
        {expenseToEdit ? (
          <ExpenseForm
            calendar={calendar}
            submitButtonContent={<Icon icon="edit" className="text-3xl" />}
            onSubmit={async (newValues) =>
              await editExpense({
                id: expenseToEdit.id,
                ...newValues,
              })
            }
            initialValues={{
              date: expenseToEdit.date,
              name: expenseToEdit.name,
              amount: expenseToEdit.amount,
              category_name: expenseToEdit.category_name,
            }}
          />
        ) : (
          <p>There&apos;s no expenses to edit.</p>
        )}
      </Modal>
    </>
  );
};

export default ExpenseTable;
