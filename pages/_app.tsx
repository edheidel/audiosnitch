import { AppProps } from "next/app";

import { Layout } from "../src/components/common/layout/Layout";
import { Loader } from "../src/components/common/loader/Loader";

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
