import { type NextPage } from "next";
import Head from "next/head";
import Navigation from "./Navigation";
import DashboardLayout from "./components/Dashboard/DashboardLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main className="flex flex-row">
        <Navigation />
        <DashboardLayout />
      </main>
    </>
  );
};

export default Home;
