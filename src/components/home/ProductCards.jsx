import { ShopCardDetailsHome } from "@/helpers";
import Link from "next/link";
import React, { useState } from "react";

const ShopCards_section = () => {
  const [data] = useState(ShopCardDetailsHome);
  return (
    // <div className="ShopCards_section">
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
                <div className="shop_card_brandwrap">
                  {/* <h2 className="shop_card_text_brandName">{`${items.BrandName}`}</h2> */}
                  <h3 className="shop_card_item_Name">
                    {`${items.ProductName}`}
                  </h3>
                  <div className="shop_card_tag">New</div>
                </div>

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
    // </div>
  );
};

export default ShopCards_section;
