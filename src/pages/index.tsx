import { type NextPage } from "next";
import Head from "next/head";
import Dashboard from "./components/Dashboard/Dashboard";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard />
    </>
  );
};

export default Home;
