// const hello = api.example.hello.useQuery({ text: "from tRPC" });
import { type NextPage } from "next";
import Head from "next/head";
import IconButton from "./components/IconButton";
import Input from "./components/Input";
import Flex from "./components/Flex";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="flex flex-row justify-center">
        <form>
          <Flex className="gap-x-2">
            <Input
              className="h-full border-2 border-neutral-900"
              attributes={{ placeholder: "Category name" }}
            />
            <IconButton icon="add" />
          </Flex>
        </form>
      </main>
    </>
  );
};

export default Home;
