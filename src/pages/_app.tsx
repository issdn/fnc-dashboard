import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ToastProvider } from "./standard-components/Toast/toastContext";
import ToastContainer from "./standard-components/Toast/ToastContainer";
import { useToast } from "./standard-components/Toast/hooks";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { toasts, deleteToast, addToast } = useToast();
  return (
    <ToastProvider addToast={addToast}>
      <Component {...pageProps} />;
      <ToastContainer toasts={toasts} deleteToast={deleteToast} />
    </ToastProvider>
  );
};

export default api.withTRPC(MyApp);
