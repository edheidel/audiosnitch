// import Link from "next/link";
import Home from "../components/Home";
import useIsMobile from "../utils/hooks/useIsMobile";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [token, setToken] = useState([]);

  useEffect(() => {
    axios("/api/auth").then((response) => setToken(response.data));
  }, []);

  const isMobile = useIsMobile();
  console.log(`--App isMobile: ${isMobile}`); // Why does the component render twice on a resolution change?

  return (
    <>
      {/* <Link href="/"> */}
      {isMobile && <h1>You are viewing a 📱 version of the site</h1>}
      {!isMobile && <Home token={token} />}
      {/* </Link> */}
    </>
  );
}
