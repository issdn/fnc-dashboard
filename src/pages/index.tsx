import { type NextPage } from "next";
import Head from "next/head";
import MainLayout from "./MainLayout";
import ExpensePanel from "./dashboard/ExpensePanel";
import CategoryPanel from "./dashboard/CategoryPanel";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout>
        <div className="flex h-full w-full flex-col gap-y-8 gap-x-8 overflow-y-auto md:p-8">
          <div className="flex w-full flex-col items-start gap-y-8 gap-x-8 xl:flex-row">
            <ExpensePanel />
          </div>
          <div className="flex h-full w-full flex-col items-start gap-y-8 gap-x-8 xl:flex-row">
            <CategoryPanel />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
