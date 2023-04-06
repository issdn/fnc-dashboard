import { useState, type FC } from "react";
import FilteredTable, {
  useFilteredTableData,
} from "../StandardComponents/FilteredTable";
import { type Income } from "@prisma/client";
import { useCalendar } from "../StandardComponents/Datepicker/hooks";
import { useToastContext } from "../StandardComponents/Toast/toastContext";
import { api } from "~/utils/api";
import EditButton from "../StandardComponents/EditButton";
import DeleteButton from "../StandardComponents/DeleteButton";
import dayjs from "dayjs";
import Icon from "../StandardComponents/Icon";
import IncomeForm from "./IncomeForm";
import Tbody from "../StandardComponents/Tbody";
import Thead from "../StandardComponents/Thead";
import Tr from "../StandardComponents/Tr";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";

const IncomeTable: FC = () => {
  const calendar = useCalendar({});
  const { addToast } = useToastContext();
  const ctx = api.useContext();

  const { data, setData } = useFilteredTableData(
    api.income.getHistory.useQuery().data || []
  );

  const [incomeToEdit, setIncomeToEdit] = useState<Income | undefined>(data[0]);
  const { isOpen, onOpen, onClose } = useModal();

  const { mutateAsync: deleteIncome } = api.income.delete.useMutation({
    onSuccess: async () => {
      await ctx.income.getLast.invalidate();
      await ctx.income.getHistory.invalidate();
      addToast({
        title: "Income deleted successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addToast({ title: error.message, type: "error" });
    },
  });

  const { mutateAsync: editIncome } = api.income.edit.useMutation({
    onSuccess: async () => {
      onClose();
      await ctx.income.getLast.invalidate();
      await ctx.income.getHistory.invalidate();
      addToast({
        title: "Income modified successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addToast({ title: error.message, type: "error" });
    },
  });

  return (
    <>
      <FilteredTable<Income> filterKey="name" data={data} setData={setData}>
        <Thead>
          <th>Date</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Actions</th>
        </Thead>
        <Tbody>
          {data.map((income, index) => (
            <Tr
              row={{
                date: dayjs(income.date).format(calendar.format),
                name: income.name,
                amount: income.amount,
              }}
              index={index}
              key={income.id}
            >
              <EditButton
                onClick={() => {
                  setIncomeToEdit(income);
                  onOpen();
                }}
              />
              <DeleteButton
                deleteModalContent={
                  <div className="flex flex-col gap-y-8">
                    <h1 className="text-center">
                      Are you sure you want to delete <br />
                      <strong>{income.name}</strong> category?
                    </h1>
                  </div>
                }
                onDelete={() => deleteIncome(income.id)}
              />
            </Tr>
          ))}
        </Tbody>
      </FilteredTable>
      <Modal onClose={onClose} isOpen={isOpen}>
        {incomeToEdit ? (
          <IncomeForm
            calendar={calendar}
            submitButtonContent={<Icon icon="edit" className="text-3xl" />}
            onSubmit={(newValues) =>
              editIncome({
                id: incomeToEdit.id,
                ...newValues,
              })
            }
            initialValues={{
              name: incomeToEdit.name,
              amount: incomeToEdit.amount,
              date: incomeToEdit.date,
            }}
          />
        ) : (
          <p>There&apos;s no income to edit.</p>
        )}
      </Modal>
    </>
  );
};

export default IncomeTable;
