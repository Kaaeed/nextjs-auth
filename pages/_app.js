import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import AppAuth from "../components/auth/app-auth";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        {Component.auth ? (
          <AppAuth>
            <Component {...pageProps} />
          </AppAuth>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
