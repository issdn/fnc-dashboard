import type { DocumentType } from "next/dist/shared/lib/utils";
import { Head, Html, Main, NextScript } from "next/document";
const Document: DocumentType = () => {
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
        <Main />
        <div id="__modal-container" />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
