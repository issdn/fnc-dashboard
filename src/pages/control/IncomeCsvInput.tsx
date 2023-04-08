import { z } from "zod";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";
import { useState } from "react";
import dayjs from "dayjs";
import CsvUploadInput from "./CsvUploadInput";
import { useSettings } from "../settingsContext";
import Button from "../StandardComponents/Button";
import Icon from "../StandardComponents/Icon";
import { useToastContext } from "../StandardComponents/Toast/toastContext";

import type { FC } from "react";
import { api } from "~/utils/api";

const schema = z.object({
  date: z.string().transform((arg) => new Date(arg)),
  name: z.string(),
  amount: z.string().transform((arg) => Number(arg)),
});

const IncomeCsvInput: FC = () => {
  const { dateFormat } = useSettings();
  const { isOpen, onOpen, onClose } = useModal();

  const { addToast } = useToastContext();
  const [csvData, setCsvData] = useState<z.infer<typeof schema>[]>([]);

  const { mutateAsync: addBatchExpenses, isLoading } =
    api.income.addBatch.useMutation({
      onSuccess: () => {
        onClose();
        addToast({
          title: "Income data added.",
          type: "success",
        });
      },
      onError: () => {
        onClose();
        addToast({
          title: "Couldn't add income data.",
          type: "error",
        });
      },
    });

  const handleCsvFileUpload = (data: z.infer<typeof schema>[]) => {
    setCsvData(data);
    onOpen();
  };

  return (
    <>
      <CsvUploadInput
        label="Income data from .csv file:"
        schema={schema}
        onFileUpload={handleCsvFileUpload}
      />
      <Modal onClose={onClose} isOpen={isOpen}>
        <div className="h-full overflow-y-auto px-2">
          <div className="flex flex-row justify-between">
            <p>
              <b>Date</b>
            </p>
            <p>
              <b>Name</b>
            </p>
            <p>
              <b>Amount</b>
            </p>
          </div>
          {csvData.map((row, i) => (
            <div
              key={i}
              className="text flex flex-row justify-between gap-x-4 text-sm"
            >
              <p key={i}>{dayjs(row.date).format(dateFormat)}</p>
              <p className="w-full " key={i}>
                {row.name}
              </p>
              <p key={i}>{row.amount}</p>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row justify-center gap-x-4">
          <Button
            type="primary"
            onClick={async () => await addBatchExpenses(csvData)}
            isLoading={isLoading}
          >
            <Icon icon="upload" />
            Upload
          </Button>
          <Button type="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default IncomeCsvInput;
