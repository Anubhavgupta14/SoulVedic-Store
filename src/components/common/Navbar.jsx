import Link from "next/link";
import React, { useEffect, useState } from "react";
import LinksDot from "../LinksDot";
import { IoSearch } from "react-icons/io5";
import { FaEuroSign } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import gsap from "gsap";
import { useRouter } from "next/router";
import { fetchuser } from "../../features/user/UserSlice";
import { getMenu, getSubMenu } from "../../../api_fetch/admin/Menu";
import Modal from "./Modal";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Navbar = ({openBag, setOpenBag}) => {
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = router.pathname;
  const pathName = router.pathname.split("/")[1];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [update, setUpdate] = useState(false);
  const user = useSelector((state) => state.user.user);
  const cartCount = useSelector((state) => state.cart.itemcount);
  useEffect(() => {
    dispatch(fetchuser());
  }, []);

  const verifyUser = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/profile");
    }
  };

  const fetchData = async () => {
    try {
      const res = await getMenu({ limit: 20, offset: 0 });
      if (res) {
        setMenu(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const go = (cat, subcat) => {
    router.push(`/collections/${cat}&${subcat}`);
  };

  useEffect(() => {
    const NavHoverLinks = document.querySelectorAll(".Nav-hover-link");
    const overlay = document.querySelector(".screen_overlay_SideNavbar");
    const SidebarDrawer = document.querySelector(".SideNavbar.SidebarClipPath");
    const Body = document.querySelector("body");
    const DataHoverLink = document.querySelectorAll(".dataHoverLink");
    const Images = document.querySelectorAll(".hover-image");

    let lastHoveredLink = null; // Track the last hovered link

    const handleMouseOver = (event) => {
      if (overlay) {
        gsap.to(
          overlay,
          {
            opacity: 1,
            visibility: "visible",
          },
          "a"
        );
        gsap.to(
          Body,
          {
            overflow: "hidden",
          },
          "a"
        );
      }

      if (SidebarDrawer) {
        gsap.to(
          SidebarDrawer,
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            ease: "power1.inOut",
          },
          "a"
        );
      }

      // Show the data hover links
      DataHoverLink.forEach((link) => {
        link.style.opacity = 1;
        link.style.visibility = "visible";

        link.addEventListener("mouseenter", (event) => {
          const targetSelector = event.target.getAttribute("data-target");
          const targetElement = document.querySelector(targetSelector);

          if (targetElement) {
            targetElement.style.opacity = 1;
            targetElement.style.visibility = "visible";
          }
          // Show corresponding image
          const targetImage = document.querySelector(
            `.hover-image[data-target="${targetSelector}"]`
          );
          if (targetImage) {
            targetImage.style.opacity = 1;
            targetImage.style.visibility = "visible";
          }
          // Hide other elements
          DataHoverLink.forEach((otherLink) => {
            if (otherLink !== event.target) {
              const otherTargetSelector = otherLink.getAttribute("data-target");
              const otherTargetElement =
                document.querySelector(otherTargetSelector);
              if (otherTargetElement) {
                otherTargetElement.style.opacity = 0;
                otherTargetElement.style.visibility = "hidden";
              }
              // Hide corresponding image
              const otherTargetImage = document.querySelector(
                `.hover-image[data-target="${otherTargetSelector}"]`
              );
              if (otherTargetImage) {
                otherTargetImage.style.opacity = 0;
                otherTargetImage.style.visibility = "hidden";
              }
            }
          });
          lastHoveredLink = event.target;
        });
      });
    };

    const handleMouseLeave = () => {
      if (lastHoveredLink) {
        const targetSelector = lastHoveredLink.getAttribute("data-target");
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
          targetElement.style.opacity = 1;
          targetElement.style.visibility = "visible";
        }
        // Show the last hovered image
        const lastHoveredImage = document.querySelector(
          `.hover-image[data-target="${targetSelector}"]`
        );
        if (lastHoveredImage) {
          lastHoveredImage.style.opacity = 1;
          lastHoveredImage.style.visibility = "visible";
        }
      } else {
        // Hide all data hover links if no link was previously hovered
        DataHoverLink.forEach((link) => {
          const targetSelector = link.getAttribute("data-target");
          const targetElement = document.querySelector(targetSelector);

          if (targetElement) {
            targetElement.style.opacity = 0;
            targetElement.style.visibility = "hidden";
          }
          const targetImage = document.querySelector(
            `.hover-image[data-target="${targetSelector}"]`
          );
          if (targetImage) {
            targetImage.style.opacity = 0;
            targetImage.style.visibility = "hidden";
          }
        });
      }

      // Reset sidebar and overlay on mouse leave
      SidebarDrawer.style.clipPath = "polygon(0 0, 0% 0, 0% 100%, 0 100%)";
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
      Body.style.overflow = "auto";
    };

    // Add event listeners
    NavHoverLinks.forEach((link) => {
      link.addEventListener("mouseover", handleMouseOver);
    });

    SidebarDrawer.addEventListener("mouseleave", handleMouseLeave);

    // Clean up the event listeners when the component unmounts
    return () => {
      NavHoverLinks.forEach((link) => {
        link.removeEventListener("mouseover", handleMouseOver);
      });
      SidebarDrawer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [update]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (window.innerWidth >= 1000) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".header_cntr",
          start: "10% 0%",
          end: "bottom 0%",
          scrub: 0.5,
          markers: false,
        },
      });
      tl.to(
        ".header_cntr",
        {
          height: "38px",
          // transition: "height 0.4s, color 0.2s 0.4s",
          // color: "#000",
          // backgroundColor: "green",
          duration: 1,
        },
        "a"
      );
      tl.to(
        ".header_inner",
        {
          height: "22px",
          // transition: "height 0.4s",
          // backgroundColor: "red",
          duration: 1,
        },
        "a"
      );
      tl.to(
        ".header_logo_svg",
        {
          height: "22px",
          // transition: "all .1s ",
          duration: 1,
        },
        "a"
      );
      tl.to(
        ".header_nav_links_wrap",
        {
          opacity: 0,
          duration: 1,
          // transition: "oapcity 0.4s, hidden 0.4s, height 0.4s",
        },
        "a"
      );
      tl.to(
        ".header_nav_links_left_inner",
        {
          opacity: 0,
          duration: 1,
          transition: "opacity 0.1s, hidden 0.1s, height 0.4s",

          // transition: "oapcity 0.4s, hidden 0.4s, height 0.4s",
        },
        "a"
      );
      tl.to(
        ".header_nav_links_left",
        {
          color: "#000",
          duration: 1,
          transition: "color 0.1s 0s",
          // transition: "oapcity 0.4s, hidden 0.4s, height 0.4s",
        },
        "b"
      );
      tl.to(
        ".header_logo_svg",
        {
          color: "#000",
          duration: 1,
          transition: "color 0.1s 0s",
        },
        "b"
      );
      tl.to(
        ".headerconatin",
        {
          backgroundColor: "#ffff",
          duration: 0.5,
          ease: "power1.inOut",
          transition: "Background-color 0.2s 0s",
        },
        "b"
      );
      tl.to(
        ".header_lineargradient",
        {
          display: "none",
        },
        "b"
      );

      gsap.to(".Shop_shopAll_text_onScroll", {
        scrollTrigger: {
          trigger: ".header_cntr",
          start: "bottom 0%",
          end: "bottom 10%",
          scrub: 0.5,
        },
        opacity: 1,
        visibility: "visible",
        // display: "none",
      });
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);
  useEffect(() => {
    if (router.pathname === "/collections/shop-all") {
      setColor("#000");
    } else if (router.pathname === "/") {
      setColor("#ffff");
    } else if (router.pathname === "/collections") {
      setColor("#ffff");
    }
  }, [router.pathname, color]);
  function openModal() {
    setModalIsOpen(true);
    // setTemp(true);

    // document.querySelector("body").style.overflow = "hidden";
    // document.querySelector(".Modal_bgClr").style.display = "initial";
    // document.querySelector(".ReactModal__Content").style.transform =
    //   "translateX(0)";
  }

  function closeModal() {
    setModalIsOpen(false);
    setOpenBag(false);
    // setTemp(false);

    // document.querySelector("body").style.overflow = "auto";
  }

  return (
    <>
      <div className="top-wht-bg-nav"></div>
      <div className="SideNavbar SidebarClipPath">
        <div className="SideNavbar_inner_wht-bg-top"></div>
        <div className="SideNavbar_inner">
          <Link
            aria-label="Back to homepage"
            aria-current="page"
            className="header_logo_cntr common_style_inherit"
            href={"/"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_2"
              viewBox="0 0 374.44 444.84"
              className="header_logo_svg_sideNav"
            >
              <defs></defs>
              <g id="Layer_1-2" data-name="Layer_1">
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M114.16,131.89c2.15-2.77,3.55-6.01,5.15-9.07,4.11-7.87,8.7-15.42,13.39-22.94,10.68-17.14,21.84-33.99,31.87-51.53,7.74-13.54,14.24-27.64,17.9-42.9.88-3.68,2.31-5.35,4.61-5.44,2.37-.1,4.28,1.89,5.15,5.52,4,16.69,11.71,31.77,20.3,46.45,9.74,16.65,20.51,32.67,30.57,49.13,14.79,24.18,28.07,49.1,36.98,76.11,5.13,15.56,9.11,31.41,10.82,47.77.18,1.73.63,3.42.95,5.14.01.33.03.67.04,1-.01.86-.21,1.76.36,2.54.04,1.15.08,2.3.12,3.46.02.67.04,1.33.06,2,.15,1.83.29,3.66.44,5.49.02.67.04,1.33.06,2-.09,3.17,0,6.34-.52,9.49-.01.33-.02.66-.03,1-.16,1-.32,2-.48,3,0,.33-.01.66-.02,1-2.09,11.77-5.53,23.08-11.35,33.6-4.08,7.37-8.96,14.13-14.5,20.49-8.24,9.46-18.01,16.97-29.08,22.7-10.9,5.64-22.43,9.52-34.67,11.15-5.19.69-10.39.98-15.62.98-9.95,0-19.63-1.61-29.15-4.44-13.3-3.95-25.5-10.15-36.08-19.04-20.23-16.99-33.16-38.37-37.4-64.72-1.5-9.31-1.31-18.61-.52-27.96,1.09-12.99,3.43-25.77,6.52-38.41,3.7-15.13,9.14-29.66,15.36-43.91,2.52-5.78,5.14-11.52,7.71-17.29.14-.17.28-.35.42-.52.21-.61.42-1.23.63-1.84ZM188.42,23.62c-.81.58-.88,1.26-1.08,1.87-3.09,9.61-7.47,18.7-11.95,27.69-7.37,14.82-15.94,28.99-24.15,43.36-11.35,19.88-22.15,40.01-30.37,61.43-5.15,13.45-9.61,27.1-12.45,41.24-1.89,9.44-3.4,18.94-3.94,28.57-.45,8.1-1.45,16.15-.07,24.31,3.59,21.28,13.31,39.19,29.93,52.83,18.72,15.36,40.36,21.96,64.62,18.65,21.52-2.94,39.51-12.76,53.32-29.38,13.51-16.24,20.59-35.01,19.71-56.52-.4-9.8-1.15-19.53-2.59-29.23-2.4-16.1-6.89-31.64-12.59-46.84-6.41-17.08-14.26-33.5-23.17-49.42-8.12-14.51-16.4-28.93-24.4-43.5-5.64-10.27-11.21-20.59-15.5-31.54-1.75-4.46-3.75-8.84-5.32-13.51Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M308.56,441.46c-19.66.28-38.06-4.55-56.1-11.07-14.59-5.27-28.19-12.58-41.5-20.46-2.09-1.24-3.9-2.68-3.95-5.32-.06-3.3,2.98-5.19,6.13-3.76,2.57,1.17,5.03,2.58,7.49,3.97,11.76,6.68,24.29,11.59,37,16.04,11.54,4.04,23.46,6.68,35.62,7.95,14.98,1.56,29.77.61,43.72-5.59,11.83-5.26,21.2-13.18,23-26.89,1.76-13.39-.69-23.69-13.09-33.08-5.13-3.89-10.99-6.15-17.37-7.68-8.06-1.93-16.16-3.27-24.33-2.93-15.74.65-31.07,3.78-45.97,9.07-16.07,5.7-31.07,13.5-45.61,22.3-10.1,6.12-19.39,13.42-29.17,20.02-18.54,12.51-38.04,23.2-59.26,30.58-11.18,3.88-22.57,6.89-34.27,8.63-16.6,2.47-33.16,2.38-49.36-2.45-16.35-4.87-29.91-13.68-36.84-30.01-7.86-18.53-5.92-36.22,6.33-52.44,4.42-5.86,10.15-10.22,16.64-13.67,10.2-5.41,21.16-7.91,32.57-8.68,23.75-1.61,46.11,4.16,67.84,13.04,13.52,5.52,26.14,12.72,38.18,20.95,2.93,2,3.5,4.7,1.5,6.91-1.58,1.74-3.61,2.04-6.14.83-8.17-3.93-16.44-7.63-24.87-10.98-16.15-6.4-32.78-11.04-50.02-13.15-12.79-1.57-25.59-.96-38.07,2.5-10.27,2.85-19.22,7.85-25.13,17.21-8.01,12.67-4.71,31.64,6.97,40.91,8.1,6.43,17.44,9.42,27.49,10.71,22.55,2.9,43.92-2.04,64.9-9.65,20.71-7.51,39.74-18.2,57.61-30.93,14.56-10.37,29.57-19.92,45.65-27.75,17.12-8.34,35.01-14.42,53.71-17.9,10.21-1.9,20.6-2.8,30.99-2.12,13.09.85,25.9,3.12,37.51,9.73,14.17,8.06,23.4,19.67,25.44,36.27,1.05,8.49,1.08,16.98-1.99,25.07-3.95,10.4-11.16,18.13-20.67,23.81-9.24,5.51-19.32,8.18-29.91,9.49-4.33.54-8.63.24-12.67.5Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M326.52,263.68c1.96-3.02,2.21-6.54,2.74-9.92,3.3-20.98-.27-41.12-7.52-60.83-8.73-23.73-21.36-45.4-34.84-66.63-13.11-20.65-27.04-40.76-40.44-61.22-6.56-10.02-12.67-20.33-18.27-30.92-4.37-8.26-7.49-17.04-8.6-26.4-.17-1.47-1.13-3.76,1.14-4.26,2.38-.53,1.95,1.96,2.37,3.29,2.94,9.44,8.27,17.56,13.97,25.47,10.79,14.97,22.93,28.88,34.58,43.16,14.03,17.19,27.75,34.62,40.18,53.03,7.92,11.73,15.46,23.69,21.72,36.39,7.81,15.85,14.43,32.16,17.46,49.71.38,2.2.83,4.39,1.24,6.58.02.5.03,1,.05,1.5.02.85-.21,1.75.39,2.52.05,2.16.1,4.32.15,6.48,0,.33,0,.66.01,1,0,.83,0,1.67,0,2.5,0,.66,0,1.33-.01,1.99-.38,18.22-5.79,34.79-16.61,49.47-9.24,12.54-21.14,21.89-35.28,28.39-.97.45-2.09,1.09-2.97.08-.99-1.14.16-2.04.78-2.81,5.17-6.56,10.39-13.08,14.86-20.15,4.7-7.44,9.17-14.99,11.69-23.51.48-.4.51-.94.5-1.5.66-1.05.49-2.27.7-3.4Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M146.59,20.88c3.48-4.83,6-10.12,7.36-15.92.27-1.14.29-2.59,1.93-2.26,1.43.29,1.29,1.53,1.23,2.81-.51,11.77-5.68,21.91-11.05,31.97-13.15,24.61-29.72,47.03-44.85,70.38-2.97,4.58-6.26,8.97-8.75,13.87-3.96,5.04-7.05,10.65-10.39,16.08-6.74,10.98-12.96,22.26-18.52,33.89-7.3,15.26-13.31,30.97-16.27,47.69-.85,4.81-1.1,9.7-1.31,14.6-.55,12.18,1.26,23.95,5.3,35.4,4.27,12.13,11.26,22.72,18.87,32.94,2.38,3.19,4.9,6.28,7.33,9.43.71.92,1.57,1.88.6,3.1-1.03,1.3-1.97.13-2.85-.27-18.99-8.53-33.19-22.14-42.59-40.67-4.51-8.88-7.3-18.38-8.46-28.28-1.67-14.27-.11-28.29,3.61-42.12,2.83-10.53,6.7-20.67,11.18-30.61,7.09-15.73,15.88-30.46,25.51-44.7,8.16-12.07,17-23.64,25.97-35.12,15.47-19.8,32.35-38.46,47.25-58.7,3.2-4.34,6.54-8.61,8.9-13.5Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M153.99,265.21c.08-18.31,13.99-34.32,34.14-34.41,19.9-.09,34.47,16,34.33,34.72-.14,18.85-15.46,34.04-34.51,34.03-17.7-.01-34.24-14.95-33.95-34.34Z"
                    fill="currentColor"
                  />
                </g>
              </g>
            </svg>
          </Link>
          <nav>
            <ul className="header_nav_links">
              {/* {menu &&
                menu.map((category, i) => ( */}
              <li data-target={`.shop`} className="dataHoverLink">
                <div className="SideNavbar_inner_left_links _list-links-redirect">
                  <Link
                    href={"/collections/shop-all"}
                    className="common_style_inherit SideNavbar_inner_links_hidden links"
                  >
                    Shop
                  </Link>
                </div>
                <nav className={`header_nav_linksInner_wrap shop`}>
                  <ul>
                    {/* {menu &&
                          category.submenus.data &&
                          category.submenus.data.map((submenu, j) => ( */}
                    <li className="_list-links-redirect">
                      <div
                        id={`shopData`}
                        onClick={() => {
                          go("Women", "Shirts");
                        }}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        Shirts
                      </div>
                    </li>
                    <li className="_list-links-redirect">
                      <div
                        id={`shopData`}
                        onClick={() => {
                          go("Women", "Coats");
                        }}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        Coats
                      </div>
                    </li>
                    <li className="_list-links-redirect">
                      <div
                        id={`shopData`}
                        onClick={() => {
                          go("Men", "T-Shirts");
                        }}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        T-Shirts
                      </div>
                    </li>
                    <li className="_list-links-redirect">
                      <div
                        id={`shopData`}
                        onClick={() => {
                          go("Kid", "Pants");
                        }}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        Pants
                      </div>
                    </li>
                    <li className="_list-links-redirect">
                      <div
                        id={`shopData`}
                        onClick={() => {
                          go("Kid", "Pants");
                        }}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        Trousers
                      </div>
                    </li>
                    <li className="_list-links-redirect">
                      <div
                        id={`shopData`}
                        onClick={() => {
                          go("Kid", "Pants");
                        }}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        Jackets
                      </div>
                    </li>
                    <li className="_list-links-redirect">
                      <div
                        id={`shopData`}
                        onClick={() => {
                          go("Kid", "Pants");
                        }}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        Shoes
                      </div>
                    </li>

                    <li>
                      <div className="SideNavbar_space_btw_links"></div>
                    </li>

                    <li className="_list-links-redirect">
                      <Link
                        id="shopData1"
                        href={"/collections"}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        New
                      </Link>
                    </li>

                    <li className="_list-links-redirect">
                      <Link
                        id="shopData1"
                        href={""}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        Best Sellers
                      </Link>
                    </li>
                    <li
                      className="_list-links-redirect"
                      style={{ color: "red" }}
                    >
                      <Link
                        id="shopData1"
                        href={""}
                        className={`common_style_inherit SideNavbar_inner_links_hidden links shopData`}
                      >
                        Sale
                      </Link>
                    </li>

                    <li>
                      <div className="SideNavbar_space_btw_links"></div>
                    </li>
                  </ul>
                </nav>
              </li>

              <li data-target=".collection" className="dataHoverLink">
                <div className="SideNavbar_inner_left_links _list-links-redirect">
                  <Link
                    href="/collection"
                    passHref
                    className="common_style_inherit SideNavbar_inner_links_hidden links"
                  >
                    Collections
                  </Link>
                </div>
                <nav className="header_nav_linksInner_wrap collection">
                  <ul>
                    <li className="_list-links-redirect">
                      <Link
                        href={"/collection"}
                        className="common_style_inherit SideNavbar_inner_links_hidden links"
                      >
                        La Mediterranée
                      </Link>
                    </li>
                    <li className="_list-links-redirect">
                      <Link
                        href={"/collection"}
                        className="common_style_inherit SideNavbar_inner_links_hidden links"
                      >
                        Decadence of a Parisian Winter
                      </Link>
                    </li>
                  </ul>
                </nav>
              </li>
              <li data-target=".about" className="dataHoverLink">
                <div className="SideNavbar_inner_left_links _list-links-redirect">
                  <Link
                    href={""}
                    className="common_style_inherit SideNavbar_inner_links_hidden links"
                  >
                    About
                  </Link>
                </div>
                <nav className="header_nav_linksInner_wrap about">
                  <ul>
                    <li className="_list-links-redirect">
                      <Link
                        href={""}
                        className="common_style_inherit SideNavbar_inner_links_hidden links"
                      >
                        Our Story
                      </Link>
                    </li>
                    <li className="_list-links-redirect">
                      <Link
                        href={""}
                        className="common_style_inherit SideNavbar_inner_links_hidden links"
                      >
                        Parisian Boutique
                      </Link>
                    </li>
                    <li className="_list-links-redirect">
                      <Link
                        href={""}
                        className="common_style_inherit SideNavbar_inner_links_hidden links"
                      >
                        Stockists
                      </Link>
                    </li>
                    <li className="_list-links-redirect">
                      <Link
                        href={""}
                        className="common_style_inherit SideNavbar_inner_links_hidden links"
                      >
                        Guides
                      </Link>
                    </li>
                    <li className="_list-links-redirect">
                      <Link
                        href={""}
                        className="common_style_inherit SideNavbar_inner_links_hidden links"
                      >
                        Sustainability
                      </Link>
                    </li>
                  </ul>
                </nav>
              </li>
            </ul>
          </nav>
          {/* {menu &&
            menu.map((el, i) => ( */}
          <Link
            data-target={`.shop`}
            href={""}
            className="common_style_inherit Sidenavbar_bottom_cntent_wrap hover-image"
          >
            <div className="Sidenavbar_bottom_cntent_cntr">
              <div className="Sidenavbar_bottom_img_cntr">
                <div className="Sidenavbar_bottom_img_wrap">
                  <div className="Sidenavbar_bottom_img_cover">
                    <img
                      src="https://cdn.sanity.io/images/h9gyalsq/production/fbda2c83746b833454469c08448a3af4d1f71091-1000x650.jpg?w=420&q=70&auto=format"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="Sidenavbar_bottom_left_text_cntr">
                Shop the Seasonal Sale
              </div>
              <div className="Sidenavbar_bottom_blank_cntr"></div>
              <div className="Sidenavbar_bottom_blank_cntr2"></div>
            </div>
          </Link>

          <Link
            data-target=".collection"
            href={""}
            className="common_style_inherit Sidenavbar_bottom_cntent_wrap hover-image"
          >
            <div className="Sidenavbar_bottom_cntent_cntr">
              <div className="Sidenavbar_bottom_img_cntr">
                <div className="Sidenavbar_bottom_img_wrap">
                  <div className="Sidenavbar_bottom_img_cover">
                    <img
                      src="https://cdn.sanity.io/images/h9gyalsq/production/76e37d985b6a6637da79212a2813b23a86288c53-1000x650.jpg?w=420&q=70&auto=format"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="Sidenavbar_bottom_left_text_cntr">Collection</div>
              <div className="Sidenavbar_bottom_blank_cntr">
                La Méditerranée
              </div>
              <div className="Sidenavbar_bottom_blank_cntr2"></div>
            </div>
          </Link>
          <Link
            data-target=".about"
            href={""}
            className="common_style_inherit Sidenavbar_bottom_cntent_wrap hover-image"
          >
            <div className="Sidenavbar_bottom_cntent_cntr">
              <div className="Sidenavbar_bottom_img_cntr">
                <div className="Sidenavbar_bottom_img_wrap">
                  <div className="Sidenavbar_bottom_img_cover">
                    <img
                      src="https://cdn.sanity.io/images/h9gyalsq/production/bdf013860f8fc605c44406dc9d81333397c1f122-1000x650.jpg?w=420&q=70&auto=format"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="Sidenavbar_bottom_left_text_cntr">About</div>
              <div className="Sidenavbar_bottom_blank_cntr">Our Story</div>
              <div className="Sidenavbar_bottom_blank_cntr2"></div>
            </div>
          </Link>
        </div>
      </div>
      <div className="screen_overlay_SideNavbar"></div>
      <div className="header_wrapper">
        {router.pathname !== "/collections/shop-all" && (
          <div className="header_lineargradient"></div>
        )}
        <div className="headerconatin"></div>
        <header className="header_cntr" style={{ color }}>
          <div className="header_inner">
            <button
              className="header_logo common_style_inherit"
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g width="20" height="20">
                  <rect
                    width="20"
                    height="1"
                    fill="black"
                    y="9.5"
                    className="_1m2ouik4 _1m2ouik6"
                  ></rect>
                  <rect
                    width="20"
                    height="1"
                    fill="black"
                    y="9.5"
                    className="_1m2ouik8 _1m2ouika"
                  ></rect>
                </g>
              </svg>
            </button>
            <Link
              aria-label="Back to homepage"
              aria-current="page"
              className="header_logo_cntr common_style_inherit"
              href={"/"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_2"
                viewBox="0 0 374.44 444.84"
                className="header_logo_svg "
                style={
                  pathName == "collections" || pathName == "product"
                    ? { color: "black" }
                    : { color: "white" }
                }
              >
                <defs></defs>
                <g id="Layer_1-2" data-name="Layer_1">
                  <g>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M114.16,131.89c2.15-2.77,3.55-6.01,5.15-9.07,4.11-7.87,8.7-15.42,13.39-22.94,10.68-17.14,21.84-33.99,31.87-51.53,7.74-13.54,14.24-27.64,17.9-42.9.88-3.68,2.31-5.35,4.61-5.44,2.37-.1,4.28,1.89,5.15,5.52,4,16.69,11.71,31.77,20.3,46.45,9.74,16.65,20.51,32.67,30.57,49.13,14.79,24.18,28.07,49.1,36.98,76.11,5.13,15.56,9.11,31.41,10.82,47.77.18,1.73.63,3.42.95,5.14.01.33.03.67.04,1-.01.86-.21,1.76.36,2.54.04,1.15.08,2.3.12,3.46.02.67.04,1.33.06,2,.15,1.83.29,3.66.44,5.49.02.67.04,1.33.06,2-.09,3.17,0,6.34-.52,9.49-.01.33-.02.66-.03,1-.16,1-.32,2-.48,3,0,.33-.01.66-.02,1-2.09,11.77-5.53,23.08-11.35,33.6-4.08,7.37-8.96,14.13-14.5,20.49-8.24,9.46-18.01,16.97-29.08,22.7-10.9,5.64-22.43,9.52-34.67,11.15-5.19.69-10.39.98-15.62.98-9.95,0-19.63-1.61-29.15-4.44-13.3-3.95-25.5-10.15-36.08-19.04-20.23-16.99-33.16-38.37-37.4-64.72-1.5-9.31-1.31-18.61-.52-27.96,1.09-12.99,3.43-25.77,6.52-38.41,3.7-15.13,9.14-29.66,15.36-43.91,2.52-5.78,5.14-11.52,7.71-17.29.14-.17.28-.35.42-.52.21-.61.42-1.23.63-1.84ZM188.42,23.62c-.81.58-.88,1.26-1.08,1.87-3.09,9.61-7.47,18.7-11.95,27.69-7.37,14.82-15.94,28.99-24.15,43.36-11.35,19.88-22.15,40.01-30.37,61.43-5.15,13.45-9.61,27.1-12.45,41.24-1.89,9.44-3.4,18.94-3.94,28.57-.45,8.1-1.45,16.15-.07,24.31,3.59,21.28,13.31,39.19,29.93,52.83,18.72,15.36,40.36,21.96,64.62,18.65,21.52-2.94,39.51-12.76,53.32-29.38,13.51-16.24,20.59-35.01,19.71-56.52-.4-9.8-1.15-19.53-2.59-29.23-2.4-16.1-6.89-31.64-12.59-46.84-6.41-17.08-14.26-33.5-23.17-49.42-8.12-14.51-16.4-28.93-24.4-43.5-5.64-10.27-11.21-20.59-15.5-31.54-1.75-4.46-3.75-8.84-5.32-13.51Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M308.56,441.46c-19.66.28-38.06-4.55-56.1-11.07-14.59-5.27-28.19-12.58-41.5-20.46-2.09-1.24-3.9-2.68-3.95-5.32-.06-3.3,2.98-5.19,6.13-3.76,2.57,1.17,5.03,2.58,7.49,3.97,11.76,6.68,24.29,11.59,37,16.04,11.54,4.04,23.46,6.68,35.62,7.95,14.98,1.56,29.77.61,43.72-5.59,11.83-5.26,21.2-13.18,23-26.89,1.76-13.39-.69-23.69-13.09-33.08-5.13-3.89-10.99-6.15-17.37-7.68-8.06-1.93-16.16-3.27-24.33-2.93-15.74.65-31.07,3.78-45.97,9.07-16.07,5.7-31.07,13.5-45.61,22.3-10.1,6.12-19.39,13.42-29.17,20.02-18.54,12.51-38.04,23.2-59.26,30.58-11.18,3.88-22.57,6.89-34.27,8.63-16.6,2.47-33.16,2.38-49.36-2.45-16.35-4.87-29.91-13.68-36.84-30.01-7.86-18.53-5.92-36.22,6.33-52.44,4.42-5.86,10.15-10.22,16.64-13.67,10.2-5.41,21.16-7.91,32.57-8.68,23.75-1.61,46.11,4.16,67.84,13.04,13.52,5.52,26.14,12.72,38.18,20.95,2.93,2,3.5,4.7,1.5,6.91-1.58,1.74-3.61,2.04-6.14.83-8.17-3.93-16.44-7.63-24.87-10.98-16.15-6.4-32.78-11.04-50.02-13.15-12.79-1.57-25.59-.96-38.07,2.5-10.27,2.85-19.22,7.85-25.13,17.21-8.01,12.67-4.71,31.64,6.97,40.91,8.1,6.43,17.44,9.42,27.49,10.71,22.55,2.9,43.92-2.04,64.9-9.65,20.71-7.51,39.74-18.2,57.61-30.93,14.56-10.37,29.57-19.92,45.65-27.75,17.12-8.34,35.01-14.42,53.71-17.9,10.21-1.9,20.6-2.8,30.99-2.12,13.09.85,25.9,3.12,37.51,9.73,14.17,8.06,23.4,19.67,25.44,36.27,1.05,8.49,1.08,16.98-1.99,25.07-3.95,10.4-11.16,18.13-20.67,23.81-9.24,5.51-19.32,8.18-29.91,9.49-4.33.54-8.63.24-12.67.5Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M326.52,263.68c1.96-3.02,2.21-6.54,2.74-9.92,3.3-20.98-.27-41.12-7.52-60.83-8.73-23.73-21.36-45.4-34.84-66.63-13.11-20.65-27.04-40.76-40.44-61.22-6.56-10.02-12.67-20.33-18.27-30.92-4.37-8.26-7.49-17.04-8.6-26.4-.17-1.47-1.13-3.76,1.14-4.26,2.38-.53,1.95,1.96,2.37,3.29,2.94,9.44,8.27,17.56,13.97,25.47,10.79,14.97,22.93,28.88,34.58,43.16,14.03,17.19,27.75,34.62,40.18,53.03,7.92,11.73,15.46,23.69,21.72,36.39,7.81,15.85,14.43,32.16,17.46,49.71.38,2.2.83,4.39,1.24,6.58.02.5.03,1,.05,1.5.02.85-.21,1.75.39,2.52.05,2.16.1,4.32.15,6.48,0,.33,0,.66.01,1,0,.83,0,1.67,0,2.5,0,.66,0,1.33-.01,1.99-.38,18.22-5.79,34.79-16.61,49.47-9.24,12.54-21.14,21.89-35.28,28.39-.97.45-2.09,1.09-2.97.08-.99-1.14.16-2.04.78-2.81,5.17-6.56,10.39-13.08,14.86-20.15,4.7-7.44,9.17-14.99,11.69-23.51.48-.4.51-.94.5-1.5.66-1.05.49-2.27.7-3.4Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M146.59,20.88c3.48-4.83,6-10.12,7.36-15.92.27-1.14.29-2.59,1.93-2.26,1.43.29,1.29,1.53,1.23,2.81-.51,11.77-5.68,21.91-11.05,31.97-13.15,24.61-29.72,47.03-44.85,70.38-2.97,4.58-6.26,8.97-8.75,13.87-3.96,5.04-7.05,10.65-10.39,16.08-6.74,10.98-12.96,22.26-18.52,33.89-7.3,15.26-13.31,30.97-16.27,47.69-.85,4.81-1.1,9.7-1.31,14.6-.55,12.18,1.26,23.95,5.3,35.4,4.27,12.13,11.26,22.72,18.87,32.94,2.38,3.19,4.9,6.28,7.33,9.43.71.92,1.57,1.88.6,3.1-1.03,1.3-1.97.13-2.85-.27-18.99-8.53-33.19-22.14-42.59-40.67-4.51-8.88-7.3-18.38-8.46-28.28-1.67-14.27-.11-28.29,3.61-42.12,2.83-10.53,6.7-20.67,11.18-30.61,7.09-15.73,15.88-30.46,25.51-44.7,8.16-12.07,17-23.64,25.97-35.12,15.47-19.8,32.35-38.46,47.25-58.7,3.2-4.34,6.54-8.61,8.9-13.5Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M153.99,265.21c.08-18.31,13.99-34.32,34.14-34.41,19.9-.09,34.47,16,34.33,34.72-.14,18.85-15.46,34.04-34.51,34.03-17.7-.01-34.24-14.95-33.95-34.34Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </svg>
            </Link>
            <div className="responsive_header_wrap">
              <Link
                href={""}
                className="_list-links-redirect responsive_header_cntr common_style_inherit common_style"
              >
                {/* <div className="links"> */}
                {!(path == "/login") && (
                  <div className="_header_inner links" onClick={openModal}>
                    <span className="">Bag</span>
                    <span className="_header_bagItemQuantity">{cartCount}</span>
                  </div>
                )}
                {/* </div> */}
              </Link>
            </div>
            {router.pathname === "/collections/shop-all" && (
              <span className="Shop_shopAll_text_wrapper Shop_shopAll_text_onScroll">
                <span className="Shop_text">Shop</span>
                <span className="Shop_text ShopAll_text">Shop All</span>
              </span>
            )}
            <nav className="header_nav_links_wrap">
              <ul
                className="header_nav_links"
                onMouseEnter={() => {
                  setUpdate((prev) => !prev);
                }}
              >
                {/* {menu &&
                  menu.map((category, i) => ( */}
                <li className="_list-links-redirect">
                  <div>
                    <Link
                      href={""}
                      className="links2 Nav-hover-link"
                      style={
                        pathName == "collections" || pathName == "product"
                          ? { color: "#000" }
                          : { color: "white" }
                      }
                    >
                      Shop
                    </Link>
                  </div>
                </li>

                <li className="_list-links-redirect">
                  <Link
                    href="/collection"
                    passHref
                    className="links2 Nav-hover-link"
                    style={
                      pathName == "collections" || pathName == "product"
                        ? { color: "#000" }
                        : { color: "white" }
                    }
                  >
                    Collections
                  </Link>
                </li>
                <li className="_list-links-redirect">
                  <Link
                    href={""}
                    className="links2 Nav-hover-link"
                    style={
                      pathName == "collections" || pathName == "product"
                        ? { color: "#000" }
                        : { color: "white" }
                    }
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
            {!(path == "/login") && (
              <div className="header_nav_links_left">
                <button
                  className="common_style_inherit common_style _list-links-redirect"
                  onClick={openModal}
                >
                  <div
                    className={
                      pathName == "collections" || pathName == "product"
                        ? "_header_inner links2 _list-links-redirect colorBlack"
                        : "_header_inner links2 _list-links-redirect"
                    }
                  >
                    {" "}
                    <span className="">Bag</span>
                    <span className="_header_bagItemQuantity">{cartCount}</span>
                  </div>
                </button>
                <div className="header_nav_links_left_inner">
                  <button
                    className={
                      pathName == "collections" || pathName == "product"
                        ? "common_style_inherit common_style _list-links-redirect colorBlack"
                        : "common_style_inherit common_style _list-links-redirect"
                    }
                  >
                    <div className="_header_inner links2 _list-links-redirect">
                      {" "}
                      <span className="">Search</span>
                      <span className="_header_bagItemQuantity">
                        <IoSearch />
                      </span>
                    </div>
                  </button>
                  <button
                    className={
                      pathName == "collections" || pathName == "product"
                        ? "common_style_inherit common_style _list-links-redirect colorBlack"
                        : "common_style_inherit common_style _list-links-redirect"
                    }
                  >
                    <div className="_header_inner links2 _list-links-redirect">
                      {" "}
                      <span className="">IN</span>
                      <span className="_header_bagItemQuantity">
                        <FaEuroSign />
                      </span>
                    </div>
                  </button>
                  <button
                    className={
                      pathName == "collections" || pathName == "product"
                        ? "common_style_inherit common_style _list-links-redirect colorBlack"
                        : "common_style_inherit common_style _list-links-redirect"
                    }
                    onClick={verifyUser}
                  >
                    <div className="_header_inner links2 _list-links-redirect">
                      {" "}
                      <span className="">Account</span>
                      <span className="_header_bagItemQuantity">
                        <FaRegUser />
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
        {/* {modalIsOpen && ( */}
        <Modal
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          setOpenBag={setOpenBag}
          openBag={openBag}
          setModalIsOpen={setModalIsOpen}
          // temp={temp}
        />
        {/* )} */}
      </div>
    </>
  );
};

export default Navbar;
