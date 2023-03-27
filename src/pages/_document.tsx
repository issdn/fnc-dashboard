import type { DocumentType } from "next/dist/shared/lib/utils";
import { Head, Html, Main, NextScript } from "next/document";
import { useToast } from "./components/Dashboard/Toast/hooks";
import { ToastProvider } from "./components/Dashboard/Toast/toastContext";
import ToastContainer from "./components/Dashboard/Toast/ToastContainer";

const Document: DocumentType = () => {
  const { toasts, deleteToast, addToast } = useToast();
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-mono">
        <ToastProvider addToast={addToast}>
          <Main />
          <div id="__modal-container" />
          <NextScript />
          <ToastContainer toasts={toasts} deleteToast={deleteToast} />
        </ToastProvider>
      </body>
    </Html>
  );
};

export default Document;
