import Navbar from "@/components/home/common/Navbar";
import "@/styles/globals.css";
import "@/styles/home.css";
import "@/styles/navbar.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
