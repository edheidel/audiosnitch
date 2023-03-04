import { AppProps } from "next/app";

import { Layout } from "../components/layout/Layout";
import { Loader } from "../components/loader/Loader";

import "./global.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Loader />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);
export default MyApp;
