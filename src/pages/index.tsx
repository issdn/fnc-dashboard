import { type NextPage } from "next";
import Head from "next/head";
import Dashboard from "./components/Dashboard/Dashboard";
import { ToastProvider } from "./components/Dashboard/Toast/toastContext";
import ToastContainer from "./components/Dashboard/Toast/ToastContainer";
import { useToast } from "./components/Dashboard/Toast/hooks";
const Home: NextPage = () => {
  const { toasts, deleteToast, addToast } = useToast();
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ToastProvider addToast={addToast}>
        <main className="p-4 font-mono">
          <Dashboard />
        </main>
        <ToastContainer toasts={toasts} deleteToast={deleteToast} />
      </ToastProvider>
    </>
  );
};

export default Home;
