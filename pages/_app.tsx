import { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import Loader from "@/components/Loader/Loader";
import "../styles/global.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Loader>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Loader>
);

export default MyApp;
