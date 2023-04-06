import { type NextPage } from "next";
import Head from "next/head";
import MainLayout from "./MainLayout";
import type { GetStaticProps } from "next/types";
import ExpenseTable from "./dashboard/ExpenseTable";
import dynamic from "next/dynamic";
import { createSSGHelper } from "./utils";
import IncomeTable from "./control/IncomeTable";
const ExpenseCharts = dynamic(import("./dashboard/ExpenseCharts"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout>
        <div className="flex h-full flex-row gap-x-8">
          <div className="h-full w-full">
            <ExpenseTable />
          </div>
          <div className="h-full w-full">
            <IncomeTable />
          </div>
        </div>
        <ExpenseCharts />
      </MainLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelper();

  await ssg.expense.getAll.prefetch();
  await ssg.income.getHistory.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Home;
