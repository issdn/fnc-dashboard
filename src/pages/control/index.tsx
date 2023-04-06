import MainLayout from "../MainLayout";
import ExpensePanel from "./ExpensePanel";
import type { GetStaticProps, NextPage } from "next/types";
import Head from "next/head";
import CategoryIncomePanel from "./CategoryIncomePanel";
import { createSSGHelper } from "../utils";
import CategoryTable from "./CategoryTable";
import { api } from "~/utils/api";
import IncomeTable from "./IncomeTable";
import type { Category } from "@prisma/client";
import { useSelectTr } from "../StandardComponents/Tr";
import CsvUploadInput from "./CsvUploadInput";

const Control: NextPage = () => {
  const { data } = api.category.getAll.useQuery();
  const { selectedTr, setSelectedTr } = useSelectTr(
    data ? (data[0] as Category) : null
  );

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
          <CsvUploadInput />
        </div>
      </MainLayout>
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
