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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
