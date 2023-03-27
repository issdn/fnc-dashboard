import Head from "next/head";
import Navigation from "./Navigation";

const Categories = () => {
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>

      <main className="flex flex-row p-4">
        <Navigation />
        <h1>Categories</h1>
      </main>
    </>
  );
};

export default Categories;
