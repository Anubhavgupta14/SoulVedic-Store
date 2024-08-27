import React, { useState } from "react";
import { FaArrowsAltV } from "react-icons/fa";
import { ShopAllCard } from "@/helpers";
import Link from "next/link";
const ShopAll = () => {
  const [data] = useState(ShopAllCard);

  return (
    <div className="ShopCollection_wrapper">
      <div>
        <div className="ShopCollection_top">
          <div className="ShopCollection_top_left">
            <div className="ShopCollection_top_left_text">
              <h1 className="ShopCollection_h1 common_style_collection">
                Shop All
              </h1>
              <sup className="ShopCollection_sup">(103)</sup>
            </div>
            {/* <div className="ShopCollection_top_left_text-wrap"></div> */}
          </div>
          <div className="ShopCollection_top-spacer"></div>
          <div className="ShopCollection_top_right">
            <button className="common_style_collection_right">
              <span>Filter</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="Filter_controls_svg"
              >
                <g clipPath="url(#clip0_2_99)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.12092 8.41678H-3.05176e-05C-3.05176e-05 8.41678 0.000192877 8.59165 0.000192877 8.80713C0.000192877 9.02261 0.000192877 9.19749 0.000192877 9.19749H7.12092C7.29578 9.87051 7.91137 10.3686 8.64288 10.3686C9.37439 10.3686 9.98998 9.87051 10.1648 9.19749H11C11 9.19749 11 9.02261 11 8.80713C11 8.59165 11 8.41678 11 8.41678H10.1648C9.98998 7.74376 9.37439 7.24571 8.64288 7.24571C7.91137 7.24571 7.29577 7.74376 7.12092 8.41678ZM8.64288 8.02642C9.07659 8.02642 9.42858 8.37618 9.42858 8.80713C9.42858 9.23809 9.07659 9.58785 8.64288 9.58785C8.20917 9.58785 7.85717 9.23809 7.85717 8.80713C7.85717 8.37618 8.20917 8.02642 8.64288 8.02642ZM3.97804 5.29392H1.30758e-05C1.30758e-05 5.29392 0.000125561 5.4688 0.000125561 5.68428C0.000125561 5.89976 1.30758e-05 6.07464 1.30758e-05 6.07464H3.97804C4.15289 6.74766 4.76848 7.24571 5.49999 7.24571C6.2315 7.24571 6.84709 6.74766 7.02194 6.07464H10.9998C10.9998 6.07464 10.9999 5.89976 10.9999 5.68428C10.9999 5.4688 10.9998 5.29392 10.9998 5.29392H7.02194C6.84709 4.6209 6.2315 4.12285 5.49999 4.12285C4.76848 4.12285 4.15289 4.6209 3.97804 5.29392ZM5.49999 4.90357C5.9337 4.90357 6.28569 5.25333 6.28569 5.68428C6.28569 6.11523 5.9337 6.46499 5.49999 6.46499C5.06628 6.46499 4.71429 6.11523 4.71429 5.68428C4.71429 5.25333 5.06628 4.90357 5.49999 4.90357ZM0.83515 2.17107H-1.64807e-05C-1.64807e-05 2.17107 -9.23127e-06 2.34595 -9.23127e-06 2.56143C-9.23127e-06 2.77691 -1.64807e-05 2.95178 -1.64807e-05 2.95178H0.83515C1.01001 3.6248 1.62559 4.12285 2.3571 4.12285C3.08862 4.12285 3.70421 3.6248 3.87906 2.95178H10.9998C10.9998 2.95178 10.9998 2.77691 10.9998 2.56143C10.9998 2.34595 10.9998 2.17107 10.9998 2.17107H3.87906C3.7042 1.49805 3.08862 1 2.3571 1C1.62559 1 1.01 1.49805 0.83515 2.17107ZM2.3571 1.78071C2.79081 1.78071 3.14281 2.13047 3.14281 2.56143C3.14281 2.99238 2.79081 3.34214 2.3571 3.34214C1.9234 3.34214 1.5714 2.99238 1.5714 2.56143C1.5714 2.13047 1.9234 1.78071 2.3571 1.78071Z"
                    fill="black"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_2_99">
                    <rect width="11" height="11"></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button className="common_style_collection_right">
              <span>Sort</span>
              <FaArrowsAltV className="sort_svg" />
            </button>
          </div>
        </div>
        <div>
          <div className="ShopCards_container">
            {data.map((items) => {
              return (
                <Link
                  key={items.id}
                  href={{ pathname: "/product", query: { id: items.id } }}
                  className="shop-card_grid"
                >
                  <div className="shop_card_cntr">
                    {/* <div className="shop_card_top"> */}
                    <div className="shop_card_img_wrapper">
                      <div className="responsive_shop_wrapper">
                        <div className="respo-shop_card-img_wrap">
                          <div className="shop_card_img-wrapper">
                            <div className="shop_card_img_cover">
                              <div className="shop_card_img_bgcover">
                                <div className="shop_card_img-main_cntr">
                                  <img
                                    src={`${items.image1}`}
                                    alt={`${items.BrandName}`}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="shop_card_img-wrapper">
                            <div className="shop_card_img_cover">
                              <div className="shop_card_img_bgcover">
                                <div className="shop_card_img-main_cntr">
                                  <img src={`${items.image2}`} alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="shop_card_img_cntr">
                        <div className="shop_card_img_inner">
                          <div className="shop_card_img-wrapper">
                            <div className="shop_card_img_cover">
                              <div className="shop_card_img_bgcover">
                                <div className="shop_card_img-main_cntr">
                                  <img src={`${items.image1}`} alt="" />
                                </div>
                              </div>
                            </div>
                            <div className="shop_card_img_cover_hidden">
                              <div className="shop_card_img_bgcover">
                                <div className="shop_card_img-main_cntr">
                                  <img src={`${items.image2}`} alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                    <div className="shop_card_text_cntr">
                      <h2 className="shop_card_text_brandName">{`${items.BrandName}`}</h2>
                      <span className="shop_card_tag">New</span>
                      <h3 className="shop_card_item_Name">
                        {`${items.ProductName}`}
                      </h3>
                      <div className="shop_card_price_wrap">
                        <div className="shop_card_price_cntr">
                          <span>{`${items.price}`}</span>
                          <span>&nbsp;EUR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAll;
