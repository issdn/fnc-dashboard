import MainLayout from "../MainLayout";
import ExpensePanel from "./ExpensePanel";
import type { GetStaticProps, NextPage } from "next/types";
import Head from "next/head";
import CategoryIncomePanel from "./CategoryIncomePanel";
import { createSSGHelper } from "../utils";
import CategoryTable from "./CategoryTable";
import { api } from "~/utils/api";
import type { Category } from "@prisma/client";
import { useSelectTr } from "../StandardComponents/Tr";
import { z } from "zod";
import Modal, { useModal } from "../StandardComponents/Modal/Modal";
import { useState } from "react";
import dayjs from "dayjs";
import CsvUploadInput from "./CsvUploadInput";
import { useSettings } from "../settingsContext";
import Button from "../StandardComponents/Button";
import Icon from "../StandardComponents/Icon";
import { useToastContext } from "../StandardComponents/Toast/toastContext";

const schema = z.object({
  date: z.string().transform((arg) => new Date(arg)),
  name: z.string(),
  amount: z.string().transform((arg) => Number(arg)),
  category_name: z.string(),
});

const Control: NextPage = () => {
  const { data } = api.category.getAll.useQuery();
  const { selectedTr, setSelectedTr } = useSelectTr(
    data ? (data[0] as Category) : null
  );
  const { dateFormat } = useSettings();
  const { addToast } = useToastContext();

  const { isOpen, onOpen, onClose } = useModal();
  const [csvData, setCsvData] = useState<z.infer<typeof schema>[]>([]);

  const { mutateAsync: addBatchExpenses, isLoading } =
    api.expense.addBatch.useMutation({
      onSuccess: () => {
        onClose();
        addToast({
          title: "Expenses added.",
          type: "success",
        });
      },
      onError: () => {
        onClose();
        addToast({
          title: "Couldn't add expenses.",
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
      <Head>
        <title>Control</title>
      </Head>
      <MainLayout>
        <div className="flex w-full flex-col items-start gap-y-8 gap-x-8 xl:flex-row">
          <ExpensePanel selectedCategory={selectedTr} />
          <CategoryTable
            selectCategory={setSelectedTr}
            selectedCategory={selectedTr}
            categories={data || []}
          />
        </div>
        <div className="flex h-full w-full flex-col items-start gap-y-8 gap-x-8 xl:flex-row">
          <CategoryIncomePanel />
          <CsvUploadInput
            label="Expenses from .csv file:"
            schema={schema}
            onFileUpload={handleCsvFileUpload}
          />
        </div>
      </MainLayout>
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

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelper();

  await ssg.category.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Control;
