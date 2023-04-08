import { type NextPage } from "next";
import Head from "next/head";
import MainLayout from "./MainLayout";
import type { GetStaticProps } from "next/types";
import ExpenseTable from "./dashboard/ExpenseTable";
import dynamic from "next/dynamic";
import { createSSGHelper } from "./utils";
import IncomeTable from "./control/IncomeTable";
import { api } from "~/utils/api";

const StackedAreaChart = dynamic(import("./dashboard/StackedAreaChart"), {
  ssr: false,
});

const Home: NextPage = () => {
  const { data: expenseData } = api.expense.getAll.useQuery();
  const { data: incomeData } = api.income.getHistory.useQuery();

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
        <StackedAreaChart
          data={{ expense: expenseData || [], income: incomeData || [] }}
        />
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
