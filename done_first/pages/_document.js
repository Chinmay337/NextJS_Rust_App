import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Eczar:wght@400;500&family=Fira+Sans:wght@100;200;300;400&family=Raleway:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Eczar:wght@400;500&family=Fira+Sans:wght@100;200;300;400&family=Raleway:wght@300;400;600&family=Roboto:wght@300;400&family=Source+Sans+Pro:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
