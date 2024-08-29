import Button from "@/components/common/Button";
import Footer from "@/components/common/Footer";
import { ShopCardDetails } from "@/helpers";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { editProduct } from "../../../api_fetch/admin/Product";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
gsap.registerPlugin(ScrollTrigger);
const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [colorSelect, setColorSelect] = useState(null);

  const fetchData = async () => {
    try {
      if (id) {
        const res = await editProduct(id);
        console.log(res, "data");
        if (res) {
          setProduct(res);
          setImages([...res.images, ...res.videoPreviewImgs]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 200);
  }, [id]);

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    if (window.innerWidth >= 1000) {
      const container = document.querySelector(".ProductDets_Big_img_wrap");
      const BlurContainer = document.querySelector(".ProductDets_grid");
      if (container) {
        const innerHeight = container.clientHeight;
        let sidebarHeight = "12.6117%";
        if (window.innerWidth >= 1300) {
          sidebarHeight = "12.6117%";
        } else if (window.innerWidth >= 1000) {
          sidebarHeight = "24.2424%";
        }

        gsap.fromTo(
          ".ProductDets_img_slider_bar",
          { height: sidebarHeight },
          {
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: `+=${innerHeight}`,
              scrub: true,
              markers: false,
            },
            top: "100%",
            transform: `translateY(-100%)`,
          }
        );
      } else {
        console.error(
          'Element with className "ProductDets_Big_img_wrap" not found.'
        );
      }
      gsap.to(BlurContainer, {
        scrollTrigger: {
          trigger: ".Similar_prd_wrap",
          start: "top -400%",
          end: "top 0%",
          scrub: true,
          markers: true,
        },
        filter: "blur(10px)",
        transform: "translateZ(0)",
      });
    }
  }, []);

  return (
    <div className="ProductDetails_wrapper">
      <div className="ProductDetails_cntr">
        <div className="ProductDets_main"></div>
        <div className="ProductDets_grid">
          <div className="ProductDets_img_wrapper">
            <div className="ProductDets_img_slider_wrap">
              <div className="ProductDets_img_slider_cntr">
                <div className="ProductDets_img_slider_cntr_sticky">
                  {images &&
                    images.map((items, i) => {
                      return (
                        <button
                          key={i}
                          className="ProductDets_img_btn ProductDets_img_align"
                        >
                          <div className="ProductDets_imgs_grid_cntr">
                            <div className="ProductDets_img_single_cntr">
                              <img src={`${items}`} alt={`images`} />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  <div className="ProductDets_img_slider_bar_cntr">
                    <div className="ProductDets_img_slider_bar"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ProductDets_Big_img_wrap">
              {images &&
                images.map((items) => {
                  return (
                    <button key={items.id} className="ProductDets_Big_img_cntr">
                      <div className="shop_card_img_bgcover">
                        <div className="shop_card_img-main_cntr">
                          <img src={`${items}`} alt={`images`} />
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="ProductDets_text_wrapper">
            <div className="ProductDets_blank-div"></div>
            <div className="ProductDets_text-container">
              <div className="ProductDets_text_container_resp">
                <div>
                  <span className="ProductDets_text_container_resp_brandName ProductDets_common_style">
                    zakary
                  </span>
                  <span className="ProductDets_text_container_resp_productName ProductDets_common_style">
                    {product?.name ?? ""}
                  </span>
                </div>
                <div className="ProductDets_text_container_price_resp ProductDets_common_style">
                  <div className="ProductDets_text_container_price_resp_flex">
                    <span>1,545</span>
                    <span>&nbsp;EUR</span>
                  </div>
                </div>
              </div>
              <div className="ProductDets_title_wrap">
                <h1 className="ProductDets_text_container_brandName ProductDets_common_style">
                  zakary
                </h1>
                <h2 className="ProductDets_text_container_productName ProductDets_common_style">
                  {product?.name ?? ""}ProductName
                </h2>
              </div>
              <div className="ProductDets_reverse_content_wrapper">
                <div className="ProductDets_description_wrap">
                  <div className="ProductDets_text_container_prdt_Desc-title">
                    Description
                  </div>
                  <div className="ProductDets_text-container_prdt_Desc">
                    <div>
                      <p>
                        <meta charSet="utf-8" />
                        <span>
                          This lambskin leather jacket offers a relaxed yet
                          sophisticated fit, featuring a matching belt to cinch
                          the waist and flatter the figure. Hidden zippers
                          provide a sleek finish, making it versatile and easy
                          to style. Wear it loose for a casual look or cinched
                          for a refined silhouette.
                        </span>
                      </p>
                    </div>
                    <div>
                      Fits large to size, we suggest taking one size smaller
                      than usual.
                    </div>
                  </div>
                </div>
                <div className="ProductDets_Variants">
                  {/* {(product?.color ?? false) && ( */}
                  <div className="ProductDets_colorVariant_wrap">
                    <span className="ProductDets_colorVariant">Color</span>
                    <span className="ProductDets_colorVariant">Scotch</span>
                  </div>
                  {/* )} */}
                  <div className="ProductDets_collection-wrap">
                    <fieldset className="ProfuctDets_fieldset">
                      {product &&
                        product.colorVar &&
                        product.colorVar.options.map((el, i) => (
                          <Link
                            href={""}
                            aria-label="Beige"
                            onClick={() => {
                              setColorSelect(i);
                            }}
                            className={
                              colorSelect == i
                                ? "shop-card_grid collection_grid Product_active_color"
                                : "shop-card_grid collection_grid"
                            }
                            key={i}
                          >
                            <div className="ProductDets_collection_imgs_grid_cntr">
                              <div className="ProductDets_imgs_grid_cntr ProductDets_imgs_grid_cntr2">
                                <div className="ProductDets_collection_img_cntr">
                                  <div
                                    className="Product_color"
                                    style={{ backgroundColor: el }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </fieldset>
                  </div>
                </div>
                <div className="ProductDets_size_wrap">
                  <div className="ProductDets-size_assist_cntr">
                    Size
                    {/* <div id="easysize-placeholder"></div> */}
                    <div id="easysize_button" className="easysize_button">
                      Size Assistance
                    </div>
                    {/* <div id="easysize-recommendation"></div> */}
                  </div>
                  <div className="ProductDets-size_numbers_cntr">
                    <div
                      className="ProductDets-size_numbers_inner"
                      id="easysize-size-selector"
                    >
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-size_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-size_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-size_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-size_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-size_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-size_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-size_numbers acitve"
                      >
                        32
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="ProductDets_weight_wrap">
                  <div className="ProductDets-weight_assist_cntr">
                    Weight
                    {/* <div id="easysize-placeholder"></div> */}
                    <div id="easyweight_button" className="easyweight_button">
                      Weight Assistance
                    </div>
                    {/* <div id="easysize-recommendation"></div> */}
                  </div>
                  <div className="ProductDets-weight_numbers_cntr">
                    <div
                      className="ProductDets-weight_numbers_inner"
                      id="easyweight-weight-selector"
                    >
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-weight_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-weight_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-weight_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-weight_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-weight_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-weight_numbers acitve"
                      >
                        32
                      </Link>
                      <Link
                        href={""}
                        aria-current="page"
                        className="ProductDets-weight_numbers acitve"
                      >
                        32
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ProductDets_Notify_main_wrap">
                <div className="ProductDets_Notify_wrap"></div>
                <div className="ProductDets_Notify_wrap">
                  <Button
                    className="ProductDets_ntfy_btn ProductDets_ntfy_btn_grid"
                    id="easysize-cart-button"
                  >
                    <span className="ProductDets_ntfy_btn_slect_size">
                      Select a Size
                    </span>

                    <span className="ProductDets_ntfy_btn_AddtoBeg">
                      Add to Bag
                    </span>
                    <div className="ProductDets_ntfy_btn_price">
                      <div className="">
                        <span>1,545</span>
                        <span>&nbsp;EUR</span>
                      </div>
                    </div>
                  </Button>
                  <div className="ProductDets_shipping_para">
                    Complimentary shipping on orders above 500 EUR.
                  </div>
                  <div className="_1l9nr81l"></div>
                </div>
                <div className="ProductDets_Notify_wrap"></div>
              </div>
              <div className="ProductDets_bottom_links_wrap">
                <div className="ProductDets_info_links">
                  <button className="ProductDets_info-btn">Details</button>
                  <button className="ProductDets_info-btn">Care</button>
                  <button className="ProductDets_info-btn">Shipping</button>
                </div>
                <div className="ProductDets_info_help">
                  <button className="ProductDets_info_text sql38zc _1l9nr81o">
                    Need help?
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="ProductDets_text_cntr">
              <div className="ProductDets_text_cntr_resp">
                <div>
                  <span className="ProductDets_text_resp_brandName ProductDets_common_style">
                    zakary
                  </span>
                  <span className="ProductDets_text_resp_productName ProductDets_common_style">
                    {product?.name ?? ""}
                  </span>
                </div>
                <div className="ProductDets_text_price_resp ProductDets_common_style">
                  <div className="ProductDets_text_price_resp_flex">
                    <span>1,545</span>
                    <span>&nbsp;EUR</span>
                  </div>
                </div>
              </div>
              <h1 className="ProductDets_text_brandName ProductDets_common_style">
                zakary
              </h1>
              <h2 className="ProductDets_text_productName ProductDets_common_style">
                {product?.name ?? ""}
              </h2>
              <div className="ProductDets_text_prdt_Desc-title">
                Description
              </div>
              <div className="ProductDets_text_prdt_Desc">
                <div>
                  <p>
                    <meta charSet="utf-8" />
                    <span>
                      This lambskin leather jacket offers a relaxed yet
                      sophisticated fit, featuring a matching belt to cinch the
                      waist and flatter the figure. Hidden zippers provide a
                      sleek finish, making it versatile and easy to style. Wear
                      it loose for a casual look or cinched for a refined
                      silhouette.
                    </span>
                  </p>
                </div>
                <div>
                  Fits large to size, we suggest taking one size smaller than
                  usual.
                </div>
              </div>
              {(product?.color ?? false) && (
                <div className="ProductDets_colorVariant_wrap">
                  <span className="ProductDets_colorVariant">Color</span>
                  <span className="ProductDets_colorVariant">Scotch</span>
                </div>
              )}
              <div className="ProductDets_collection-wrap">
                <fieldset className="ProfuctDets_fieldset">
                  {product &&
                    product.colorVar &&
                    product.colorVar.options.map((el, i) => (
                      <Link
                        href={""}
                        aria-label="Beige"
                        onClick={() => {
                          setColorSelect(i);
                        }}
                        className={
                          colorSelect == i
                            ? "shop-card_grid collection_grid Product_active_color"
                            : "shop-card_grid collection_grid"
                        }
                        key={i}
                      >
                        <div className="ProductDets_collection_imgs_grid_cntr">
                          <div className="ProductDets_imgs_grid_cntr ProductDets_imgs_grid_cntr2">
                            <div className="ProductDets_collection_img_cntr">
                              <div
                                className="Product_color"
                                style={{ backgroundColor: el }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </fieldset>
              </div>

              <div className="ProductDets-size_assist_cntr">
                Size
                <div id="easysize-placeholder"></div>
                <div id="easysize_button" className="easysize_button">
                  Size Assistance
                </div>
                <div id="easysize-recommendation"></div>
              </div>

              <div className="ProductDets-size_numbers_cntr">
                <div
                  className="ProductDets-size_numbers_inner"
                  id="easysize-size-selector"
                >
                  <Link
                    href={""}
                    aria-current="page"
                    className="ProductDets-size_numbers acitve"
                  >
                    32
                  </Link>
                  <Link
                    href={""}
                    aria-current="page"
                    className="ProductDets-size_numbers acitve"
                  >
                    32
                  </Link>
                  <Link
                    href={""}
                    aria-current="page"
                    className="ProductDets-size_numbers acitve"
                  >
                    32
                  </Link>
                  <Link
                    href={""}
                    aria-current="page"
                    className="ProductDets-size_numbers acitve"
                  >
                    32
                  </Link>
                  <Link
                    href={""}
                    aria-current="page"
                    className="ProductDets-size_numbers acitve"
                  >
                    32
                  </Link>
                  <Link
                    href={""}
                    aria-current="page"
                    className="ProductDets-size_numbers acitve"
                  >
                    32
                  </Link>
                  <Link
                    href={""}
                    aria-current="page"
                    className="ProductDets-size_numbers acitve"
                  >
                    32
                  </Link>
                </div>
              </div>
              <div className="ProductDets_Notify_wrap">
                <button
                  className="ProductDets_ntfy_btn ProductDets_ntfy_btn_grid"
                  id="easysize-cart-button"
                >
                  <span className="ProductDets_ntfy_btn_slect_size">
                    Select a Size
                  </span>

                  <span className="ProductDets_ntfy_btn_AddtoBeg">
                    Add to Bag
                  </span>
                  <div className="ProductDets_ntfy_btn_price">
                    <div className="">
                      <span>1,545</span>
                      <span>&nbsp;EUR</span>
                    </div>
                  </div>
                </button>
                <div className="ProductDets_shipping_para">
                  Complimentary shipping on orders above 500 EUR.
                </div>
                <div className="_1l9nr81l"></div>
              </div>
              <div className="ProductDets_info_links">
                <button className="ProductDets_info-btn">Details</button>
                <button className="ProductDets_info-btn">Care</button>
                <button className="ProductDets_info-btn">Shipping</button>
              </div>
              <div className="ProductDets_info_help">
                <button className="ProductDets_info_text sql38zc _1l9nr81o">
                  Need help?
                </button>
              </div>
            </div> */}
          </div>
          <div className="ProductDets_text_btn_resp_cntr ProductDets_common_style">
            <div className="ProductDets_text_btn_resp_wrap">
              <Button className="ProductDets_text_btn_resp_w-full">
                <div className="ProductDets_text_btn_resp_flex">
                  <span>Select a Size</span>
                  <div>
                    <span>1,545</span>
                    <span>&nbsp;EUR</span>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="Similar_prd_wrap">
          <h2 className="Similar_prd_head">
            <span className="Similar_prd_pieces">Pieces</span>
            <span className="Similar_prd_like-this">You may also like</span>
          </h2>
          <div className="Similar_prd_cntr">
            {ShopCardDetails.map((items) => {
              return (
                <div key={items.id} className="Similar_prd_card_cntr">
                  <Link href={""} className="shop-card_grid shop-card-w-full">
                    <div className="similar-prd shop_card_img_bgcover">
                      <div className="shop_card_img-main_cntr">
                        <img
                          src={`${items.image1}`}
                          alt={`${items.BrandName}`}
                        />
                      </div>
                    </div>
                    <div className="similar-prd-text">
                      <h3 className="similar-prd-dets _brandName">{`${items.BrandName}`}</h3>
                      <h4 className="similar-prd-dets _ProductName">
                        {" "}
                        {`${items.ProductName}`}
                      </h4>
                      <div className="shop_card_price_wrap">
                        <div className="shop_card_price_cntr">
                          <span>{`${items.price}`}</span>
                          <span>&nbsp;EUR</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
      {/* Render product details */}
    </div>
  );
};

export default ProductPage;
