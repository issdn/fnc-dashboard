import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ToastProvider } from "./StandardComponents/Toast/toastContext";
import ToastContainer from "./StandardComponents/Toast/ToastContainer";
import { useToast } from "./StandardComponents/Toast/hooks";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { toasts, deleteToast, addToast } = useToast();
  return (
    <ToastProvider addToast={addToast}>
      <Component {...pageProps} />
      <ToastContainer toasts={toasts} deleteToast={deleteToast} />
    </ToastProvider>
  );
};

export default api.withTRPC(MyApp);
