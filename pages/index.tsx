// import Link from "next/link";
import Home from "../components/Home";
import useIsMobile from "../utils/hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();
  console.log(`--App isMobile: ${isMobile}`); //Why does component render twice on a resolution change?

  return (
    <>
      {/* <Link href="/"> */}
      {/* <Home /> */}
      {/* </Link> */}
      {isMobile && <h1>You are viewing a 📱 version of the site</h1>}
      {!isMobile && <Home />}
    </>
  );
}
