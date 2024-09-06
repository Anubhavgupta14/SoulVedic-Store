import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { FinalPrice } from "../../../api_fetch/admin/Cart";
import { editqty } from "@/features/cart/CartSlice";
import OutsideClickHandler from "react-outside-click-handler";
import Button from "./Button";
const Modal = ({ closeModal, temp, setModalIsOpen, modalIsOpen, openBag, setOpenBag }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const cartCount = useSelector((state) => state.cart.itemcount);
  const [prices, setPrices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // console.log(prices,"proces")

  useEffect(() => {
    const fetchPrices = async () => {
      const updatedPrices = await Promise.all(
        cart.map(async (el) => {
          // Start from index 1
          try {
            const data = await FinalPrice({
              productid: el.productid,
              variants: el.variants[0], // assuming variants is an array and you want to send the first variant
            });
            if (data.err) {
              return 100;
            }
            // const data = await response.json();
            // console.log("plplpll", data);
            return data; // Assuming you get the price from the response
          } catch (error) {
            console.error("Error fetching price:", error);
            return null;
          }
        })
      );
      setPrices(updatedPrices);
      let sum = 0;
      for (let i = 0; i < updatedPrices.length; i++) {
        sum += updatedPrices[i] * cart[i].qty;
      }
      setTotalAmount(sum);
    };
    {
      cart && fetchPrices();
    }
  }, [cart]);

  return (
    <div
      className={
        (modalIsOpen || openBag)
          ? "Modal_wrapper pointEventall"
          : "Modal_wrapper pointEventnone"
      }
    >
      <div
        className={
          (modalIsOpen || openBag)
            ? "Modal_Overlay Modal_bgClr Modal_content"
            : "Modal_Overlay Modal_content"
        }
      >
        <OutsideClickHandler
          onOutsideClick={() => {
            setModalIsOpen(false);
            setOpenBag(false)
          }}
        >
          <div
            className={
              (modalIsOpen || openBag)
                ? "ReactModal__Content translateCart"
                : "ReactModal__Content"
            }
          >
            <div className="ReactModal__Content_cntr">
              <div className="ReactModal__Content_Drawer">
                <div className="ReactModal_Drawer_inner">
                  <div className="ReactModal_Drawer_inner_top">
                    <h1>
                      Bag <sup>({cartCount})</sup>
                    </h1>
                    <button className="Modal_cancel_btn">
                      <RxCross2 onClick={closeModal} />
                    </button>
                  </div>
                  <div style={{ overflow: "auto" }}>
                    {cart &&
                      cart.map((item, i) => {
                        const price = prices[i];
                        return (
                          <div
                            className="ReactModal_Drawer_center"
                            key={`item-${i}`}
                          >
                            <div
                              className="Modal_Drawer_img_cntr"
                              aria-current="page"
                            >
                              <div className="Modal_drawer_img_wrap">
                                <div className="Modal_drawer_img_wrap_grid">
                                  <div className="Modal_Drawer_img_grid_cover">
                                    <img src={item.img} alt="image" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="ReactModal_Drawer_center_content">
                              <div className="Modal_Drawer_center_content_lft">
                                <div className="Modal_center_lft_top">
                                  <h2 className="Modal_item_name">
                                    {item.name}
                                  </h2>
                                  {/* <span>Leather Trench Coat</span> */}
                                  <div>
                                    {Object.keys(item.variants[0]).map(
                                      (el, j, array) => (
                                        <span key={el} className="">
                                          {item.variants[0][el]}
                                          {j !== array.length - 1 && " / "}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="Modal_center_lft_Qunty">
                                  <span>Quantity</span>
                                  <button
                                    className="cart_Quantity_btn"
                                    onClick={() => {
                                      dispatch(
                                        editqty({
                                          id: item.productid,
                                          work: -1,
                                        })
                                      );
                                    }}
                                  >
                                    <FiMinus />
                                  </button>
                                  <span className="cart_Quantity_number">
                                    {item.qty}
                                  </span>
                                  <button
                                    className="cart_Quantity_btn"
                                    onClick={() => {
                                      dispatch(
                                        editqty({ id: item.productid, work: 1 })
                                      );
                                    }}
                                  >
                                    <FiPlus />
                                  </button>
                                </div>
                                <button
                                  className="Modal_remove_btn"
                                  onClick={() => {
                                    dispatch(
                                      editqty({ id: item.productid, work: -2 })
                                    );
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="Modal_Drawer_center_content_ryt">
                                <div className="cmn_style Modal_Drawer_center_content_ryt_price">
                                  <div className="Modal_Drawer_center_content_ryt_price_cntr"></div>
                                  {!price ? (
                                    <></>
                                  ) : (
                                    <span>{price * item.qty}</span>
                                  )}

                                  <span>&nbsp;INR</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {cart.length == 0 && (
                      <div>
                        <h1 className="no-item">
                          There are currently no items in your bag.
                        </h1>
                      </div>
                    )}
                  </div>
                  <div className="Modal_drawer_checkout_wrap">
                    <dl className="cmn_style Modal_drawer_checkout_wrap_top">
                      <dt>Total</dt>
                      {/* <dd className="Modal_drawer_cross_price">
                        <span>₹1,795.00</span>
                      </dd> */}
                      <dd className="Modal_drawer_main_price">
                        <div>{totalAmount} INR</div>
                      </dd>
                    </dl>
                    <div className="cmn_style Modal_drawer_checkout_wrap_btm">
                      <span>
                        Free worldwide shipping on orders over 500 INR
                      </span>
                      {/* <button className="cmn_style common_style_inherit"></button> */}
                      <button
                        className="_btn_wrapper"
                        onClick={() => {
                          router.push("/checkout");
                          setModalIsOpen(false);
                        }}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default Modal;
