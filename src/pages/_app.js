import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import "@/styles/globals.css";
import "@/styles/home.css";
import "@/styles/navbar.css";
import "@/styles/collections.css";
import "@/styles/shopAll.css";
// import Modal from "@/components/Modal";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />

      <Footer />
    </>
  );
}
