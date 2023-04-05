import { type NextPage } from "next";
import Head from "next/head";
import MainLayout from "./MainLayout";
import type { GetStaticProps } from "next/types";
import ExpenseTable from "./dashboard/ExpenseTable";
import dynamic from "next/dynamic";
import { createSSGHelper } from "./utils";
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
        <ExpenseTable />
        <ExpenseCharts />
      </MainLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelper();

  await ssg.expense.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default Home;
