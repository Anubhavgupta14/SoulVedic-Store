import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../store";
import "@/styles/globals.css";
import "@/styles/home.css";
import "@/styles/cartModal.css";
import "@/styles/navbar.css";
import "@/styles/collections.css";
import "@/styles/shopAll.css";
// import Modal from "@/components/Modal";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </PersistGate>
      </Provider>
    </>
  );
}
