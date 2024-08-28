import Link from "next/link";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import OutsideClickHandler from 'react-outside-click-handler';
import Button from "./Button";
const Modal = ({ closeModal, temp, setModalIsOpen, modalIsOpen }) => {
  return (
    <div className={modalIsOpen ? "Modal_wrapper pointEventall":"Modal_wrapper pointEventnone"} >
      <div className={modalIsOpen ? "Modal_Overlay Modal_bgClr Modal_content":"Modal_Overlay Modal_content"}>
      <OutsideClickHandler onOutsideClick={()=>{setModalIsOpen(false)}}>
        <div className={modalIsOpen ? "ReactModal__Content translateCart" : "ReactModal__Content"}>
          <div className="ReactModal__Content_cntr">
            <div className="ReactModal__Content_Drawer">
              <div className="ReactModal_Drawer_inner">
                <div className="ReactModal_Drawer_inner_top">
                  <h1>
                    Bag <sup>(1)</sup>
                  </h1>
                  <button className="Modal_cancel_btn">
                    <RxCross2 onClick={closeModal} />
                  </button>
                </div>
                <div>
                  <div className="ReactModal_Drawer_center">
                    <Link
                      href={""}
                      className="Modal_Drawer_img_cntr"
                      aria-current="page"
                    >
                      <div className="Modal_drawer_img_wrap">
                        <div className="Modal_drawer_img_wrap_grid">
                          <div className="Modal_Drawer_img_grid_cover">
                            <img
                              src="https://cdn.shopify.com/s/files/1/0030/2946/7203/files/Henri-beige_1.jpg?v=1711038323&width=420&height=630&crop=center"
                              alt="Model is wearing Nour Hammour's Henri Double Breasted Leather Trench Coat in beige - Front  "
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="ReactModal_Drawer_center_content">
                      <div className="Modal_Drawer_center_content_lft">
                        <div className="Modal_center_lft_top">
                          <h2 className="">Henri</h2>
                          <span>Leather Trench Coat</span>
                          <span className="">beige / 36</span>
                        </div>
                        <div className="Modal_center_lft_Qunty">
                          <span>Quantity</span>
                          <button className="cart_Quantity_btn">
                            <FiMinus />
                          </button>
                          <span className="cart_Quantity_number">1</span>
                          <button className="cart_Quantity_btn">
                            <FiPlus />
                          </button>
                        </div>
                        <button className="Modal_remove_btn">Remove</button>
                      </div>
                      <div className="Modal_Drawer_center_content_ryt">
                        <div className="cmn_style Modal_Drawer_center_content_ryt_price">
                          <div className="Modal_Drawer_center_content_ryt_price_cntr"></div>
                          <span>1,795</span>
                          <span>&nbsp;EUR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Modal_drawer_checkout_wrap">
                  <dl className="cmn_style Modal_drawer_checkout_wrap_top">
                    <dt>Total</dt>
                    <dd className="Modal_drawer_cross_price">
                      <span>€1,795.00</span>
                    </dd>
                    <dd className="Modal_drawer_main_price">
                      <div>€1,256.50</div>
                    </dd>
                  </dl>
                  <div className="cmn_style Modal_drawer_checkout_wrap_btm">
                    <span>Free worldwide shipping on orders over 500 EUR</span>
                    {/* <button className="cmn_style common_style_inherit"></button> */}
                    <Button className="Modal_drawer_checkout_btn">
                      Checkout
                    </Button>
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
