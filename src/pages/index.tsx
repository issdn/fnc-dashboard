import { type NextPage } from "next";
import Head from "next/head";
import Navigation from "./Navigation";
import Dashboard from "./dashboard/Dashboard";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main className="flex flex-row">
        <Navigation />
        <Dashboard />
      </main>
    </>
  );
};

export default Home;
