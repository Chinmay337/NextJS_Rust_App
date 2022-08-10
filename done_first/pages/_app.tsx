import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </UserProvider>
  );
}
