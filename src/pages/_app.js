// import Smoothscroll from "@/components/home/Smoothscroll";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Smoothscroll /> */}
      <Component {...pageProps} />
    </>
  );
}
