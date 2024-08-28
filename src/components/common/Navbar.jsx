import Link from "next/link";
import React, { useEffect, useState } from "react";
import LinksDot from "../LinksDot";
import { IoSearch } from "react-icons/io5";
import { FaEuroSign } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import { FaRegUser } from "react-icons/fa";
import gsap from "gsap";
import { useRouter } from "next/router";
import { getMenu, getSubMenu } from "../../../api_fetch/admin/Menu";
import Modal from "../Modal";
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
const Navbar = () => {
  const [menu, setMenu] = useState([]);
  const [subMenu, setSubMenu] = useState([]);
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [update, setUpdate] = useState(false)

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

  const go = (cat, subcat)=>{
    router.push(`/collections/${cat}&${subcat}`)
  }

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



  console.log(update)
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
          transition: "opacity 0.4s, hidden 0.4s, height 0.4s",

          // transition: "oapcity 0.4s, hidden 0.4s, height 0.4s",
        },
        "a"
      );
      tl.to(
        ".header_nav_links_left",
        {
          color: "#000",
          duration: 1,
          transition: "color 0.8s 0.4s",
          // transition: "oapcity 0.4s, hidden 0.4s, height 0.4s",
        },
        "b"
      );
      tl.to(
        ".header_logo_svg",
        {
          color: "#000",
          duration: 1,
          transition: "color 0.8s 0.4s",
        },
        "b"
      );
      tl.to(
        ".headerconatin",
        {
          backgroundColor: "#ffff",
          duration: 1,
          transition: "Background-color 0.8s 0.4s",
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
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
            href={""}
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
              {menu &&
                menu.map((category, i) => (
                  <li data-target={`.shop-${i}`} className="dataHoverLink">
                    <div className="SideNavbar_inner_left_links _list-links-redirect">
                      <Link
                        href={"/collections/shop-all"}
                        className="common_style_inherit SideNavbar_inner_links_hidden links"
                      >
                        {category?.name ?? ""}
                      </Link>
                    </div>
                    <nav className={`header_nav_linksInner_wrap shop-${i}`}>
                      <ul>
                        <li className="_list-links-redirect">
                          <Link
                            id="shopData1"
                            href={"/collections"}
                            className={`common_style_inherit SideNavbar_inner_links_hidden links shopData${i}`}
                          >
                            New
                          </Link>
                        </li>
                        <li className="_list-links-redirect">
                          <Link
                            id="shopData1"
                            href={""}
                            className={`common_style_inherit SideNavbar_inner_links_hidden links shopData${i}`}
                          >
                            Permanent Collection
                          </Link>
                        </li>
                        <li className="_list-links-redirect">
                          <Link
                            id="shopData1"
                            href={""}
                            className={`common_style_inherit SideNavbar_inner_links_hidden links shopData${i}`}
                          >
                            Best Sellers
                          </Link>
                        </li>
                        <li className="_list-links-redirect">
                          <Link
                            id="shopData1"
                            href={""}
                            className={`common_style_inherit SideNavbar_inner_links_hidden links shopData${i}`}
                          >
                            Sale
                          </Link>
                        </li>
                        <li>
                          <div className="SideNavbar_space_btw_links"></div>
                        </li>

                        {menu &&
                          category.submenus.data &&
                          category.submenus.data.map((submenu, j) => (
                            <li className="_list-links-redirect" key={j}>
                              <div
                                id={`shopData${i}`}
                                onClick={()=>{go(category.name, submenu.name)}}
                                className={`common_style_inherit SideNavbar_inner_links_hidden links shopData${i}`}
                              >
                                {submenu.name}
                              </div>
                            </li>
                          ))}


                      </ul>
                    </nav>
                  </li>
                ))}
              <li data-target=".collection" className="dataHoverLink">
                <div className="SideNavbar_inner_left_links _list-links-redirect">
                  <Link
                    href="/collections"
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
                        href={""}
                        className="common_style_inherit SideNavbar_inner_links_hidden links"
                      >
                        La Mediterranée
                      </Link>
                    </li>
                    <li className="_list-links-redirect">
                      <Link
                        href={""}
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
          {menu &&
            menu.map((el, i) => (
              <Link
                data-target={`.shop-${i}`}
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
            ))}
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
        <div class="headerconatin"></div>
        <header className="header_cntr" style={{ color }}>
          <div className="header_inner">
            <button
              className="header_logo common_style_inherit"
              aria-label="Open menu"
            >
              {/* <svg
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
                    // className="_1m2ouik4 _1m2ouik7"
                  ></rect>
                  <rect
                    width="20"
                    height="1"
                    fill="black"
                    y="9.5"
                    // className="_1m2ouik8 _1m2ouikb"
                  ></rect>
                </g>
              </svg> */}
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
              {/* <svg
                viewBox="0 0 146 120"
                className="header_logo_svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M27.0744 11.0123C27.0587 11.0113 27.043 11.0102 27.0284 11.0102L27.0325 11.006C26.3628 10.9597 25.76 10.9386 25.1907 10.9386C23.3071 10.9386 21.4737 11.1408 19.703 11.5201V2.91162C19.703 1.30623 21.0007 0 22.5955 0C23.3699 0 24.0982 0.307595 24.6215 0.834299L55.639 35.9549L56.3338 36.7429L57.0538 37.5561L64.0861 45.5241L64.0801 45.5274C64.0752 45.5302 64.0713 45.5325 64.0652 45.5325C63.9291 45.5978 63.793 45.6621 63.657 45.7264C63.521 45.7906 63.385 45.8549 63.2489 45.9202C63.0709 46.0029 62.8929 46.0874 62.716 46.1713C62.6226 46.2157 62.5295 46.2599 62.4369 46.3036C61.1476 46.923 59.8919 47.5382 58.6738 48.145L55.0446 44.0367L54.3204 43.2192L53.6172 42.4228L48.2341 36.3257L47.6774 35.6937L47.1332 35.0743L30.8794 16.6691C31.0552 16.2056 31.1557 15.7084 31.1557 15.1859C31.1557 12.9232 29.3557 11.0776 27.1204 11.0144C27.1058 11.0144 27.0901 11.0134 27.0744 11.0123ZM146 37.5603C146 25.9686 138.231 16.1761 127.657 13.1634C127.643 13.1597 127.628 13.1553 127.613 13.1507C127.594 13.1448 127.574 13.1387 127.553 13.1339C127.343 13.0749 127.134 13.0159 126.925 12.9653C126.828 12.9415 126.731 12.9191 126.633 12.8964L126.633 12.8964L126.633 12.8964C126.558 12.879 126.482 12.8615 126.406 12.8431L126.374 12.8359L126.351 12.8305C126.334 12.8263 126.316 12.8221 126.297 12.8179C124.531 12.4218 122.693 12.2027 120.809 12.2027C120.759 12.2027 120.709 12.2048 120.659 12.2069C120.608 12.209 120.558 12.2111 120.508 12.2111H120.378C120.267 12.2111 120.158 12.2148 120.048 12.2185C119.992 12.2204 119.936 12.2223 119.88 12.2237C119.692 12.2322 118.988 12.2659 118.988 12.2659C117.394 12.2659 116.096 13.5721 116.096 15.1775C116.096 16.7829 117.394 18.0891 118.988 18.0891H119.164C119.193 18.0891 119.223 18.0891 119.252 18.0849C119.461 18.0681 119.671 18.0554 119.88 18.047C120.089 18.0386 120.299 18.0343 120.508 18.0301H120.571C120.611 18.0301 120.651 18.029 120.691 18.028H120.691H120.691H120.691L120.736 18.0268L120.768 18.0262L120.805 18.0259C122.312 18.0259 123.777 18.2071 125.184 18.5358C125.556 18.6242 125.924 18.7212 126.289 18.8265C126.498 18.8896 126.707 18.957 126.916 19.0243L126.916 19.0245L127.022 19.0607C127.197 19.1204 127.374 19.1806 127.544 19.2437C134.928 22.0078 140.203 29.171 140.203 37.5561C140.203 45.937 134.928 53.1044 127.544 55.8685V64.1315C134.928 66.8956 140.203 74.0588 140.203 82.4439C140.203 90.8248 134.928 97.9922 127.544 100.756C127.374 100.819 127.197 100.88 127.022 100.939L126.916 100.975C126.707 101.047 126.498 101.11 126.289 101.174C124.547 101.692 122.705 101.974 120.801 101.974C120.7 101.974 120.6 101.97 120.499 101.966C120.29 101.966 120.081 101.957 119.872 101.949L119.872 101.949C119.662 101.94 119.453 101.924 119.244 101.907C119.218 101.907 119.193 101.906 119.168 101.904C119.144 101.902 119.12 101.9 119.097 101.898H118.98C118.005 101.902 117.142 102.391 116.619 103.141C116.489 103.322 116.385 103.52 116.301 103.731C116.209 103.963 116.142 104.212 116.113 104.469C116.1 104.582 116.092 104.7 116.092 104.818C116.092 106.424 117.389 107.73 118.984 107.73H118.993C119.013 107.73 119.074 107.733 119.164 107.739L119.165 107.739C119.244 107.743 119.346 107.749 119.461 107.755C119.872 107.776 120.449 107.802 120.805 107.802C122.689 107.802 124.526 107.587 126.293 107.186C126.502 107.14 126.711 107.094 126.921 107.039C126.976 107.024 127.032 107.009 127.087 106.994L127.235 106.955L127.314 106.933L127.441 106.899L127.511 106.88L127.549 106.87C138.172 103.896 145.992 94.0735 145.992 82.4439C145.992 73.4731 141.207 65.0837 133.509 60.5457L132.584 60.0021L133.509 59.4586C141.207 54.9205 145.992 46.5311 145.992 37.5603H146ZM71.3487 42.2796C67.2465 40.632 63.1192 39.1783 59.2179 38.1165L65.2707 44.9721C67.2507 44.0535 69.2892 43.1476 71.3487 42.2796ZM114.849 104.818C114.849 107.119 116.707 108.994 118.959 108.994L118.955 108.99C119.005 108.994 120.186 109.061 120.809 109.061C122.693 109.061 124.526 108.859 126.297 108.48V117.088C126.297 118.694 124.999 120 123.405 120C122.655 120 121.956 119.718 121.416 119.204L93.7474 87.8668L93.3665 87.4371L90.361 84.0324L89.662 83.2403L88.942 82.427L81.9013 74.4506C81.9055 74.4464 81.9139 74.4464 81.9139 74.4464C81.9771 74.4174 82.0402 74.3879 82.1034 74.3582L82.2027 74.3116C82.2617 74.2838 82.3207 74.2561 82.3797 74.2285C82.417 74.2112 82.4543 74.1939 82.4915 74.1768C82.5193 74.1635 82.5465 74.1508 82.5734 74.1383C82.6236 74.1148 82.6727 74.0919 82.7217 74.0672C82.7857 74.036 82.8497 74.0059 82.9137 73.9758L82.9144 73.9755L82.9164 73.9745C82.9813 73.944 83.0462 73.9134 83.111 73.8818C83.2492 73.8186 83.3915 73.7512 83.5296 73.6838C83.5966 73.6501 83.6636 73.6164 83.7347 73.5826C83.8715 73.518 84.0046 73.4534 84.1376 73.3887C84.2041 73.3565 84.2706 73.3242 84.3375 73.2919C84.5468 73.195 84.7561 73.0939 84.9612 72.9927C85.161 72.8963 85.3567 72.8 85.5524 72.7036L85.5556 72.702C85.6782 72.644 85.7994 72.5846 85.9199 72.5254C86.001 72.4857 86.0818 72.446 86.1626 72.407L86.2487 72.3647L86.3617 72.3094C86.4901 72.2467 86.6172 72.1845 86.7444 72.1205C86.8014 72.0924 86.8588 72.064 86.9164 72.0354L87.0288 71.9795L87.0328 71.9775L87.1208 71.9337L87.2283 71.8804L87.3137 71.8382L90.9596 75.9676L91.6838 76.785L92.387 77.5814L97.1464 82.9706L97.7701 83.6743L98.3268 84.3063L98.8709 84.9257L99.0133 85.0901L99.1598 85.2544L115.121 103.331C114.945 103.794 114.849 104.296 114.849 104.818ZM126.301 99.8546V20.1538C124.568 19.5976 122.726 19.2984 120.813 19.2984C120.713 19.2984 120.613 19.3026 120.512 19.3069V100.706C120.562 100.706 120.613 100.708 120.663 100.71C120.713 100.712 120.763 100.714 120.813 100.714C122.726 100.714 124.568 100.411 126.301 99.8588V99.8546ZM76.1499 67.9448L64.4419 54.6845C66.133 53.8376 67.9539 52.9527 69.8501 52.0636L81.5581 65.3239L81.489 65.358L81.4087 65.3981L81.3175 65.4439L81.3167 65.4444L81.3158 65.4448L81.3149 65.4453L81.3141 65.4457L81.3132 65.4461C81.2316 65.4872 81.1499 65.5283 81.0683 65.5683C81.0223 65.5894 80.972 65.6147 80.9218 65.6399L80.8721 65.6645L80.7244 65.7377L80.7223 65.7387C80.5901 65.8043 80.4566 65.8705 80.3232 65.9349C80.2897 65.9518 80.2604 65.9644 80.227 65.9812C79.0591 66.5543 77.8452 67.14 76.5978 67.7299C76.5873 67.7362 76.5758 67.7415 76.5643 67.7468L76.5526 67.7522C76.5451 67.7557 76.5377 67.7594 76.5308 67.7636C76.4052 67.8268 76.2796 67.8858 76.1499 67.9448ZM23.2401 58.2155C23.261 57.9206 23.282 57.6298 23.3113 57.3391C23.3238 57.2253 23.3364 57.1158 23.3531 57.0062C23.3576 56.9657 23.3633 56.9264 23.3688 56.8877L23.3689 56.8875C23.3737 56.8538 23.3785 56.8204 23.3824 56.7871C23.3908 56.7197 23.4002 56.6523 23.4096 56.5849C23.4191 56.5174 23.4285 56.45 23.4369 56.3826C23.4452 56.3257 23.4526 56.2699 23.4599 56.214C23.4672 56.1582 23.4745 56.1024 23.4829 56.0455C23.4913 55.997 23.4986 55.9486 23.5059 55.9001C23.5132 55.8517 23.5206 55.8032 23.5289 55.7548C23.5406 55.6914 23.5536 55.6279 23.5664 55.5653L23.5713 55.5414C23.5798 55.4997 23.5881 55.4584 23.5959 55.4177C23.6336 55.207 23.6754 54.9921 23.7215 54.7814C23.7717 54.5455 23.8261 54.3137 23.8847 54.0777C23.9266 53.905 23.9685 53.7322 24.0145 53.5595C24.0857 53.2982 24.1568 53.037 24.2364 52.7757C24.2436 52.7515 24.251 52.7272 24.2585 52.7029L24.2758 52.647L24.2949 52.5864L24.295 52.5861C24.3149 52.5229 24.3347 52.4597 24.3536 52.3965C24.4498 52.0973 24.5461 51.8024 24.655 51.5074C24.6654 51.4759 24.6769 51.4453 24.6884 51.4148L24.6884 51.4147C24.7 51.3842 24.7115 51.3536 24.7219 51.322C24.9521 50.6942 25.2075 50.0706 25.4879 49.4638V19.2984H25.1866C23.2736 19.2984 21.4318 19.6018 19.6988 20.1538V99.8588C21.4318 100.415 23.2736 100.714 25.1866 100.714C25.287 100.714 25.3875 100.71 25.4879 100.706V70.5699C24.567 68.5811 23.9015 66.4658 23.5289 64.2621L23.5213 64.2144L23.5212 64.2142C23.5029 64.1004 23.485 63.989 23.4703 63.8744C23.4662 63.8534 23.463 63.8312 23.4599 63.8091L23.4573 63.7912L23.4544 63.7723C23.4529 63.7626 23.4513 63.7531 23.4494 63.7438C23.4473 63.727 23.4442 63.709 23.441 63.6911C23.4379 63.6732 23.4348 63.6553 23.4327 63.6385C23.4034 63.432 23.3783 63.2213 23.3531 63.0106C23.3478 62.9637 23.342 62.9163 23.3363 62.8687C23.3239 62.767 23.3115 62.6645 23.3029 62.564V62.5261C23.2652 62.1637 23.2401 61.8013 23.2192 61.439L23.2119 61.2767L23.2066 61.1566C23.1899 60.7774 23.1773 60.394 23.1773 60.0105C23.1773 59.5597 23.1899 59.113 23.215 58.6664C23.2192 58.5926 23.2255 58.5179 23.2317 58.4431C23.238 58.3683 23.2443 58.2935 23.2485 58.2197L23.2401 58.2155ZM118.955 1.35258C119.034 1.45792 119.11 1.5759 119.185 1.71495C119.24 1.82029 119.294 1.93827 119.344 2.06047L119.344 2.06075L119.344 2.0608C119.361 2.09861 119.378 2.13644 119.39 2.17845C119.487 2.43969 119.579 2.74307 119.662 3.09702C119.742 3.44675 119.817 3.84705 119.884 4.30212C119.9 4.40621 119.914 4.51369 119.929 4.62455C119.937 4.6887 119.946 4.75398 119.955 4.82039C120.018 5.33024 120.077 5.90751 120.127 6.5522C120.16 6.98199 120.19 7.44549 120.219 7.9427C120.248 8.4399 120.273 8.97082 120.299 9.54388C120.315 9.98631 120.332 10.4582 120.349 10.9512H120.516C120.566 10.9512 120.617 10.9502 120.667 10.9491L120.667 10.9491L120.667 10.9491C120.717 10.9481 120.767 10.947 120.818 10.947C122.697 10.947 124.535 11.1493 126.305 11.5285C126.351 11.5369 126.402 11.5496 126.448 11.5622C126.531 8.57474 126.665 6.41315 126.862 4.84989C126.883 4.67713 126.904 4.5128 126.929 4.35689V4.34425C127.021 3.72064 127.126 3.20236 127.243 2.77678C127.314 2.51554 127.394 2.288 127.473 2.08996C127.662 1.62646 127.879 1.31044 128.126 1.09133C128.394 0.855367 128.695 0.728958 129.039 0.640472V0.0926999H117.8V0.632045C118.143 0.716317 118.44 0.842726 118.708 1.07869C118.796 1.15875 118.88 1.24723 118.959 1.35258H118.955ZM26.8902 118.496C26.9698 118.618 27.0493 118.719 27.133 118.812C27.2167 118.904 27.3046 118.98 27.3967 119.048C27.6269 119.212 27.8823 119.313 28.1669 119.385V119.924H16.9278V119.385C17.6059 119.216 18.1249 118.883 18.5184 117.872C18.7403 117.303 18.9203 116.515 19.071 115.424C19.2886 113.84 19.4309 111.606 19.523 108.442C19.5523 108.448 19.5816 108.456 19.6109 108.463C19.6402 108.47 19.6695 108.478 19.6988 108.484C21.4695 108.863 23.3071 109.066 25.1866 109.066C25.2112 109.066 25.2357 109.065 25.2603 109.065L25.3372 109.064L25.3383 109.063C25.3704 109.063 25.4026 109.062 25.4347 109.062C25.4524 109.062 25.4702 109.061 25.4879 109.061H25.6177C25.6512 110.182 25.6931 111.185 25.7433 112.074C25.8354 113.705 25.9568 114.96 26.1116 115.938C26.1222 115.998 26.1324 116.057 26.1424 116.116L26.1424 116.116L26.1424 116.116L26.1424 116.116C26.1684 116.267 26.1933 116.412 26.2205 116.549C26.3419 117.16 26.48 117.632 26.6391 118.007L26.643 118.015L26.6467 118.024L26.6508 118.034L26.6558 118.047C26.661 118.061 26.6663 118.074 26.6726 118.087C26.7395 118.239 26.8149 118.374 26.8902 118.496ZM119.256 70.2497V64.1778H116.64C116.192 64.1778 115.744 64.1862 115.296 64.1989C113.409 72.2132 106.242 78.1966 97.7115 78.1966C97.3808 78.1966 97.0375 78.1839 96.6859 78.1671C96.6524 78.1671 96.6189 78.165 96.5855 78.1629L96.5508 78.1608C96.5368 78.16 96.5228 78.1593 96.5088 78.159C96.5037 78.1588 96.4987 78.1587 96.4936 78.1587C96.4907 78.1587 96.4879 78.1586 96.485 78.1586C96.1501 78.1376 95.8069 78.1081 95.4594 78.0702C95.431 78.0676 95.4029 78.0645 95.375 78.0614L95.325 78.0556L95.3243 78.0555L95.3234 78.0554L95.2588 78.048L95.2219 78.044L95.1874 78.0407C94.9195 78.0112 94.6432 77.9732 94.3627 77.9311L99.4068 83.6448C108.151 83.1392 115.635 77.8047 119.248 70.2539L119.256 70.2497ZM80.694 75.0255L80.7167 75.0153L80.7209 75.0111L86.7779 81.8709C85.4133 81.5001 84.0236 81.0787 82.6129 80.6194C79.9967 79.764 77.3219 78.7696 74.6555 77.6994C74.6848 77.6909 74.7099 77.6783 74.7392 77.6657C74.8502 77.6172 74.9621 77.5698 75.0741 77.5224C75.1861 77.475 75.298 77.4276 75.409 77.3791C75.6266 77.2864 75.8443 77.1937 76.0578 77.101C76.2838 77.0041 76.5057 76.9072 76.7275 76.8103C76.7776 76.7886 76.8278 76.7666 76.8782 76.7445L77.0499 76.6691C77.1576 76.6217 77.2654 76.5743 77.3722 76.528C77.594 76.4268 77.8117 76.3299 78.0335 76.233L78.1204 76.1938L78.1748 76.1694L78.2975 76.1148L78.3541 76.0896C78.4607 76.0423 78.5673 75.9949 78.674 75.9465C78.8917 75.8454 79.1051 75.7484 79.3228 75.6515L79.9632 75.3608C80.1809 75.2639 80.3944 75.167 80.6079 75.0658C80.6241 75.0577 80.6413 75.0495 80.659 75.0414L80.694 75.0255ZM65.7103 46.1603L65.547 46.2362C65.3461 46.3289 65.1493 46.4216 64.9526 46.5143C64.9482 46.5165 64.9436 46.5187 64.9388 46.5209L64.9254 46.5269C64.916 46.5311 64.9066 46.5353 64.8982 46.5396L64.7714 46.5992L64.6295 46.6659C64.4499 46.7502 64.2704 46.8345 64.0945 46.9188C62.529 47.6604 61.0053 48.402 59.5402 49.1309C59.3439 49.2277 59.1516 49.3244 58.9594 49.4212L58.9584 49.4217C58.7617 49.5186 58.5691 49.6155 58.3766 49.7124C58.3452 49.7293 58.3127 49.7451 58.2803 49.7609C58.2478 49.7767 58.2154 49.7925 58.184 49.8093L58.1254 49.843C56.0366 51.0397 45.0487 56.9472 31.7249 57.0821C31.5617 58.0301 31.4696 59.0035 31.4696 60.0021C31.4696 61.0007 31.5617 61.9741 31.7249 62.9222C45.0905 63.0612 56.1371 69.0235 57.9705 70.0727L58.1924 70.178C60.0718 71.1261 62.0643 72.1036 64.1238 73.077C64.1621 73.063 64.2004 73.0482 64.2391 73.0333L64.24 73.033L64.2417 73.0323C64.2675 73.0224 64.2935 73.0124 64.3196 73.0025C64.3337 72.9972 64.3479 72.9919 64.3622 72.9867C64.3761 72.9816 64.3901 72.9766 64.4043 72.9717C64.5843 72.9042 64.7684 72.8326 64.9484 72.761C65.0003 72.7401 65.0533 72.7202 65.1062 72.7004L65.1074 72.6999L65.141 72.6873C65.1832 72.6714 65.2252 72.6554 65.2665 72.6388L65.4222 72.5779L65.5407 72.5313C65.6318 72.4955 65.7228 72.4597 65.8149 72.4239C65.9195 72.3818 66.0242 72.3396 66.1288 72.3017C66.313 72.2301 66.493 72.1584 66.6772 72.0826L66.9911 71.9562L66.9936 71.9552C67.1769 71.8797 67.3603 71.8042 67.5479 71.7286C67.596 71.7097 67.6441 71.6897 67.6923 71.6696C67.7202 71.658 67.7481 71.6464 67.776 71.635C67.7962 71.6268 67.8165 71.6186 67.8367 71.6107C67.9351 71.5706 68.0324 71.5306 68.1297 71.4906C68.227 71.4505 68.3244 71.4105 68.4227 71.3705C68.4425 71.3616 68.4625 71.3531 68.4827 71.3447L68.5376 71.3221L68.5378 71.322C68.5528 71.3159 68.5678 71.3098 68.5827 71.3036C68.5904 71.3005 68.598 71.2973 68.6056 71.2941C68.6215 71.2874 68.6373 71.2806 68.6529 71.2736C68.7165 71.2472 68.7797 71.2209 68.8428 71.1945L68.9714 71.1407L69.1325 71.0733L69.2892 71.0081L69.3093 70.9992L69.3094 70.9992C69.3174 70.9956 69.3253 70.9921 69.3331 70.9888C69.346 70.9834 69.359 70.9784 69.3729 70.9744C70.0594 70.6837 70.7459 70.3887 71.424 70.0895C71.4324 70.0895 71.4408 70.0811 71.4491 70.0769C70.9259 69.8409 70.411 69.605 69.8752 69.3564C60.5323 65.0037 52.7926 60.5962 52.7172 60.5499L51.7545 60.0021L52.7172 59.4543L52.7658 59.427L52.7659 59.4269C53.2386 59.1601 57.0733 56.9951 62.416 54.2842L62.4165 54.2839C62.6088 54.1871 62.8012 54.0903 62.9978 53.9893L62.9983 53.989C63.1907 53.8922 63.3831 53.7953 63.5796 53.6985C65.2707 52.8516 67.0874 51.9625 68.9836 51.0692C69.0819 51.0229 69.1812 50.9766 69.2806 50.9303C69.3801 50.8839 69.4796 50.8375 69.578 50.7911C69.6785 50.7448 69.779 50.6984 69.8794 50.6478L70.0259 50.5804L70.1724 50.513C70.5137 50.3529 70.8498 50.2007 71.1869 50.0481L71.187 50.048L71.1871 50.048L71.188 50.0476L71.4533 49.9273C71.6789 49.8248 71.9076 49.719 72.1313 49.6157L72.2319 49.5692C72.4612 49.4662 72.6817 49.3692 72.9057 49.2706L72.9076 49.2697L73.0314 49.2152C75.6057 48.0649 78.0335 47.0494 80.3107 46.1645C80.5868 46.0593 80.8587 45.954 81.1307 45.8487L81.1311 45.8485C81.3331 45.7715 81.535 45.6968 81.7353 45.6226L81.7355 45.6226L81.7356 45.6225L81.7358 45.6224L81.9557 45.5409C84.0822 44.753 86.0747 44.0788 87.9165 43.5395C87.9562 43.5289 87.9949 43.5173 88.0336 43.5057C88.0724 43.4942 88.1111 43.4826 88.1509 43.472C88.6071 43.3414 89.055 43.215 89.5029 43.097C89.6243 43.0633 89.7415 43.0338 89.8587 43.0043C90.2647 42.899 90.6708 42.7979 91.0684 42.7052C91.123 42.6923 91.1768 42.6803 91.2301 42.6684L91.2305 42.6683L91.2309 42.6682L91.2312 42.6681L91.2319 42.668C91.3007 42.6526 91.3687 42.6374 91.4368 42.6209C91.7926 42.5408 92.1442 42.465 92.4916 42.3976C92.6172 42.3723 92.7428 42.347 92.8642 42.3259C93.1949 42.2627 93.5256 42.2037 93.8479 42.1532C93.9441 42.1363 94.0446 42.1195 94.1409 42.1068C94.5009 42.052 94.8567 42.0057 95.2041 41.9636C95.2882 41.952 95.3724 41.944 95.4533 41.9362L95.4762 41.9341C95.8236 41.8961 96.1669 41.8666 96.5017 41.8456C96.5352 41.8456 96.5687 41.8435 96.6022 41.8414C96.6191 41.8403 96.6361 41.8392 96.6531 41.8384L96.6722 41.8377C96.6786 41.8375 96.6851 41.8373 96.6915 41.8372C96.6952 41.8372 96.6989 41.8371 96.7027 41.8371C97.0501 41.8203 97.3975 41.8076 97.7282 41.8076C106.259 41.8076 113.425 47.791 115.313 55.8053L115.329 55.8057L115.329 55.8058C115.646 55.814 115.958 55.8222 116.196 55.8222H119.269V49.7503C115.468 41.8076 107.389 36.3173 98.0631 36.3173C91.6126 36.3173 83.0817 38.896 74.6639 42.2754C74.5508 42.3209 74.4377 42.3672 74.3243 42.4136C74.1649 42.4788 74.0049 42.5442 73.8435 42.6082C73.7053 42.6651 73.5661 42.722 73.427 42.7789C73.2878 42.8358 73.1486 42.8927 73.0105 42.9495C70.6873 43.9103 68.3892 44.9257 66.154 45.9539C66.0116 46.0213 65.8651 46.0887 65.7228 46.1519L65.7103 46.1603ZM26.8316 101.907H27.0074H27.0116C28.6064 101.907 29.9041 103.213 29.9041 104.818C29.9041 106.424 28.6064 107.73 27.0116 107.73C27.0116 107.73 25.7642 107.789 25.5884 107.789H25.4921L25.4916 107.789C25.3913 107.793 25.291 107.797 25.1907 107.797C23.3071 107.797 21.4695 107.578 19.703 107.182C19.6801 107.176 19.6562 107.171 19.6323 107.165L19.6319 107.165C19.6078 107.16 19.5837 107.155 19.5607 107.148C19.5101 107.137 19.4594 107.125 19.4089 107.114L19.4084 107.114L19.4079 107.114C19.2959 107.089 19.1845 107.064 19.0751 107.035C18.8659 106.984 18.6566 106.925 18.4473 106.866L18.3091 106.828C7.75229 103.807 0 94.023 0 82.4439C0 73.4773 4.78448 65.088 12.4824 60.5457L13.4074 60.0021L12.4824 59.4585C4.78448 54.9205 0 46.5311 0 37.5603C0 25.9307 7.81926 16.1129 18.4514 13.1255C18.556 13.0981 18.6606 13.0697 18.7651 13.0413L18.7654 13.0412L18.7657 13.0411C18.8702 13.0127 18.9748 12.9843 19.0793 12.9569C19.2886 12.9021 19.4979 12.8558 19.7072 12.8094L19.7072 12.8094C21.4737 12.4091 23.3113 12.1942 25.1949 12.1942C25.6679 12.1942 26.1702 12.2111 26.7186 12.2448C26.759 12.2468 26.7985 12.2499 26.8384 12.2529L26.8385 12.2529C26.8811 12.2562 26.9243 12.2595 26.9698 12.2617H27.0074H27.0158C28.6106 12.2617 29.9083 13.5679 29.9083 15.1733C29.9083 15.2913 29.8999 15.405 29.8873 15.5188C29.858 15.7758 29.791 16.0244 29.699 16.2562C29.6152 16.4669 29.5106 16.6649 29.3808 16.8461C28.9664 17.436 28.3469 17.8658 27.6228 18.0217C27.4344 18.0596 27.2418 18.0849 27.0451 18.0849C26.9965 18.0808 26.949 18.0777 26.9019 18.0747C26.8516 18.0714 26.8018 18.0682 26.7521 18.0638C26.543 18.0473 26.338 18.0389 26.1369 18.0307L26.1368 18.0306L26.1368 18.0306L26.1242 18.0301C25.9065 18.0217 25.6972 18.0175 25.4963 18.0175H25.1949C23.2903 18.0175 21.4486 18.2998 19.7072 18.8181L19.7072 18.8181C19.4979 18.8813 19.2886 18.9445 19.0793 19.0161L18.9736 19.0522C18.7986 19.1119 18.6221 19.1721 18.4514 19.2352C11.0675 21.9994 5.79329 29.1668 5.79329 37.5477C5.79329 45.9328 11.0675 53.096 18.4514 55.8601V64.123C11.0675 66.8872 5.79329 74.0546 5.79329 82.4355C5.79329 90.8206 11.0675 97.9838 18.4514 100.748C18.6218 100.811 18.798 100.871 18.9728 100.931L19.0793 100.967C19.2886 101.034 19.4979 101.102 19.7072 101.165C20.0672 101.27 20.4356 101.367 20.8081 101.456C22.2146 101.784 23.6838 101.966 25.1907 101.966H25.3791H25.4879L25.4891 101.966C25.698 101.961 25.9069 101.957 26.1158 101.949C26.3251 101.94 26.5344 101.928 26.7437 101.911C26.773 101.907 26.8023 101.907 26.8316 101.907ZM80.2688 73.827C80.2646 73.8312 80.2563 73.8355 80.2563 73.8355L80.2479 73.8607L79.8335 74.0504C77.5982 75.0785 75.3043 76.0897 72.9895 77.0505C72.8518 77.1072 72.7131 77.1639 72.5744 77.2206C72.4347 77.2776 72.2951 77.3347 72.1565 77.3918C72.0203 77.4466 71.8841 77.5025 71.7479 77.5584C71.612 77.6142 71.4762 77.6699 71.3403 77.7246C62.9141 81.1124 54.3874 83.6996 47.9704 83.708H47.9411C44.0147 83.708 40.3186 82.7304 37.0578 81.0155V81.0281C32.4575 78.6053 28.8869 74.8257 26.7312 70.3086C26.5051 69.8367 26.2958 69.3564 26.1033 68.8718C25.8689 68.2861 25.6638 67.692 25.4754 67.0894C25.1866 66.1498 24.9522 65.1891 24.7805 64.2115C24.7512 64.043 24.7219 63.8702 24.6968 63.6975C24.6947 63.6785 24.6916 63.6595 24.6884 63.6406C24.6853 63.6216 24.6822 63.6027 24.6801 63.5837V63.571L24.68 63.5708C24.6507 63.3644 24.6215 63.158 24.5963 62.9516C24.5754 62.7873 24.5545 62.6188 24.5377 62.4502V62.4123C24.5043 62.071 24.4791 61.7255 24.4582 61.38C24.4568 61.3505 24.455 61.321 24.4531 61.2915C24.4494 61.2325 24.4457 61.1735 24.4457 61.1145C24.4289 60.7563 24.4164 60.394 24.4164 60.0274C24.4164 59.5976 24.4289 59.172 24.4498 58.7507C24.454 58.679 24.4603 58.6084 24.4666 58.5379C24.4729 58.4673 24.4791 58.3967 24.4833 58.3251C24.5001 58.047 24.521 57.7689 24.5503 57.495C24.567 57.3602 24.5838 57.2295 24.6005 57.0989C24.6026 57.0757 24.6058 57.0536 24.6089 57.0315C24.612 57.0094 24.6152 56.9873 24.6173 56.9641C24.6382 56.7955 24.6591 56.6312 24.6843 56.4669C24.6905 56.4332 24.6947 56.3984 24.6989 56.3636C24.7031 56.3289 24.7073 56.2941 24.7136 56.2604C24.7345 56.1214 24.7596 55.9781 24.7847 55.839C24.7931 55.7801 24.8056 55.7211 24.8182 55.6621L24.8183 55.6617C24.8559 55.4596 24.8936 55.2575 24.9354 55.0595C24.9856 54.8362 25.0359 54.6171 25.0903 54.3938L25.2159 53.9008C25.2828 53.6522 25.3498 53.4036 25.4252 53.155C25.4335 53.1275 25.4419 53.1012 25.4503 53.0748C25.4587 53.0485 25.467 53.0222 25.4754 52.9948C25.4859 52.9611 25.4963 52.9285 25.5068 52.8958C25.5172 52.8632 25.5277 52.8305 25.5382 52.7968C25.5483 52.7658 25.5584 52.7347 25.5685 52.7036C25.6506 52.4516 25.7334 52.1974 25.8228 51.9499C25.8333 51.9204 25.8437 51.8919 25.8542 51.8635C25.8647 51.835 25.8751 51.8066 25.8856 51.7771L25.8856 51.777C25.9568 51.5832 26.0279 51.3894 26.1033 51.1956C26.2958 50.711 26.5051 50.2349 26.7312 49.763C28.1837 46.7292 30.2766 44.0029 32.9305 41.7908H32.943C36.6894 38.6643 41.4111 36.6839 46.5765 36.3847L51.6205 42.0984C50.4275 41.9298 49.3057 41.8329 48.2718 41.8329C46.8905 41.8329 45.551 41.993 44.2617 42.288C37.5643 43.8218 32.2691 49.1099 30.6868 55.8306V55.8475C30.6366 56.0539 30.5906 56.2604 30.5487 56.4669V56.4795C30.511 56.686 30.4734 56.8924 30.4399 57.0989V57.1116C30.398 57.3728 30.3603 57.6383 30.331 57.9037C30.2515 58.599 30.2055 59.3069 30.2055 60.0274C30.2055 61.026 30.2892 62.0036 30.4441 62.9559C30.4775 63.1708 30.5152 63.3814 30.5571 63.5921C30.5597 63.6052 30.5623 63.6199 30.5649 63.6352C30.5665 63.6446 30.568 63.6542 30.5696 63.6637C30.5957 63.7947 30.6257 63.9237 30.6555 64.0521C30.6689 64.1095 30.6823 64.1668 30.6952 64.2242C30.6965 64.2307 30.6978 64.2368 30.6991 64.2427C30.702 64.256 30.7049 64.2686 30.7078 64.2832C32.4575 71.5896 38.5898 77.1895 46.137 78.0912C46.8277 78.1713 47.5309 78.2218 48.2467 78.2218H48.276C48.6067 78.2218 48.9541 78.2092 49.3015 78.1924L49.5025 78.1797C49.8373 78.1586 50.1806 78.1292 50.528 78.0912C50.6201 78.0828 50.7122 78.0744 50.8043 78.0617C51.1517 78.0196 51.5075 77.9732 51.8675 77.9185C51.9638 77.9058 52.0642 77.889 52.1605 77.8721L52.2414 77.8584C52.5374 77.8081 52.837 77.7573 53.14 77.6994C53.2656 77.6783 53.3912 77.653 53.5167 77.6277C53.8642 77.5603 54.2116 77.4845 54.5674 77.4044C54.6356 77.3878 54.7038 77.3726 54.7728 77.3572C54.8265 77.3452 54.8807 77.333 54.9358 77.3201C55.3334 77.2274 55.7394 77.1263 56.1455 77.021C56.2627 76.9915 56.3799 76.962 56.5013 76.9283C56.945 76.8103 57.3929 76.6839 57.8491 76.5532C57.8889 76.5427 57.9276 76.5311 57.9663 76.5196C58.005 76.508 58.0438 76.4964 58.0835 76.4858C59.9337 75.9465 61.9346 75.2723 64.0736 74.4759C64.3457 74.3748 64.6177 74.2737 64.8982 74.1683C65.0588 74.1086 65.2194 74.046 65.3809 73.983C65.493 73.9393 65.6054 73.8955 65.7186 73.8523C67.9832 72.9717 70.4026 71.9562 72.9644 70.8143C72.9728 70.8101 72.9812 70.8016 72.9895 70.8016C73.151 70.7282 73.3093 70.6581 73.4694 70.5871C73.5665 70.5441 73.6643 70.5007 73.7639 70.4561L73.8646 70.4096C74.0882 70.3062 74.3169 70.2005 74.5425 70.098C74.6388 70.0538 74.7353 70.0097 74.832 69.9655C75.16 69.8154 75.4904 69.6643 75.8234 69.5081C75.9197 69.4617 76.0118 69.4196 76.1122 69.3732C76.1625 69.35 76.2139 69.3257 76.2653 69.3015C76.3165 69.2773 76.3676 69.2531 76.4178 69.23C76.516 69.1837 76.6152 69.1374 76.7144 69.0912C76.814 69.0447 76.9136 68.9983 77.0122 68.9519C78.9042 68.0586 80.7209 67.1695 82.412 66.3226C82.6087 66.2256 82.8013 66.1287 82.9938 66.0318C83.1906 65.9307 83.3831 65.8338 83.5757 65.7369C87.8202 63.5837 91.1061 61.776 92.5168 60.9923C92.8851 60.7858 93.1321 60.6468 93.2409 60.5836C93.2577 60.5752 93.2702 60.5667 93.2702 60.5667L94.233 60.019L93.2702 59.4712L93.2612 59.4661C92.5446 59.0591 84.2947 54.3742 74.5634 49.9357C76.9871 48.8739 79.4568 47.85 81.893 46.9356C83.944 47.909 85.924 48.8781 87.7951 49.8262C88.3351 50.1085 100.407 56.3278 114.108 57.0441C114.137 57.0484 114.166 57.0484 114.196 57.0484H114.254C114.326 57.0515 114.403 57.0553 114.482 57.0592C114.614 57.0657 114.755 57.0726 114.899 57.0778C115.112 57.0863 115.33 57.0947 115.539 57.0989C115.769 57.1073 115.987 57.1073 116.171 57.1073H119.244V62.9348H116.171C115.999 62.9348 115.788 62.9387 115.569 62.9427L115.539 62.9432C115.33 62.9474 115.112 62.9559 114.899 62.9643C114.76 62.9694 114.626 62.976 114.498 62.9823C114.414 62.9864 114.332 62.9904 114.254 62.9938H114.196C114.158 62.9938 114.116 62.998 114.078 63.0022H114.045C113.963 63.0064 113.883 63.0117 113.802 63.017C113.721 63.0222 113.641 63.0275 113.559 63.0317C113.292 63.0485 113.024 63.0696 112.756 63.0906L112.756 63.0907C112.674 63.097 112.591 63.1044 112.509 63.1118C112.426 63.1191 112.343 63.1265 112.262 63.1328L112.262 63.1328C111.994 63.1581 111.726 63.1834 111.458 63.2129L110.993 63.2635C110.696 63.2972 110.403 63.3351 110.11 63.373C110.049 63.3814 109.989 63.3888 109.928 63.3962C109.867 63.4036 109.807 63.4109 109.746 63.4194C109.336 63.4783 108.925 63.5373 108.515 63.6005C108.481 63.6051 108.449 63.6109 108.416 63.6166C108.389 63.6214 108.362 63.6262 108.335 63.63C108.237 63.6465 108.14 63.6626 108.042 63.6787C107.79 63.7202 107.541 63.7614 107.293 63.807C107.23 63.8186 107.167 63.8302 107.105 63.8418C107.031 63.8555 106.958 63.8692 106.883 63.8829C106.751 63.9082 106.618 63.9335 106.485 63.9588C106.352 63.9841 106.219 64.0093 106.087 64.0345C106.012 64.0493 105.937 64.0651 105.861 64.0809C105.786 64.0967 105.711 64.1125 105.635 64.1273C105.388 64.1778 105.141 64.2284 104.894 64.2832C104.767 64.3081 104.643 64.336 104.516 64.3645C104.493 64.3696 104.47 64.3749 104.447 64.3801C104.323 64.4095 104.2 64.438 104.076 64.4664C103.953 64.4948 103.829 64.5233 103.706 64.5528C103.644 64.5679 103.582 64.5822 103.52 64.5964C103.444 64.6139 103.369 64.6312 103.295 64.6497C103.015 64.7172 102.739 64.7846 102.462 64.8562C102.411 64.8702 102.359 64.8829 102.306 64.8958C102.264 64.9061 102.221 64.9166 102.178 64.9278C101.899 64.998 101.623 65.0729 101.349 65.1473C101.261 65.1712 101.173 65.195 101.085 65.2186C101.046 65.2291 101.006 65.2407 100.966 65.2523C100.926 65.2639 100.886 65.2755 100.847 65.286C100.726 65.3211 100.604 65.3554 100.484 65.3896C100.329 65.4334 100.175 65.477 100.022 65.522C99.8965 65.5557 99.7751 65.5936 99.6495 65.6315C99.4235 65.6947 99.2016 65.7621 98.984 65.8296C98.9191 65.8506 98.8531 65.8707 98.7872 65.8907C98.7213 65.9107 98.6554 65.9307 98.5905 65.9518C98.3812 66.015 98.1761 66.0782 97.971 66.1456C97.9182 66.1627 97.8661 66.1792 97.8144 66.1955C97.739 66.2193 97.6646 66.2428 97.5901 66.2678C97.4646 66.3082 97.3391 66.3501 97.2145 66.3918C97.1313 66.4196 97.0485 66.4472 96.9664 66.4742C96.9208 66.4895 96.8758 66.5042 96.8313 66.5186C96.7655 66.5401 96.7006 66.5612 96.6357 66.5838C96.3887 66.6681 96.1501 66.7481 95.9157 66.8324C95.8529 66.8535 95.7818 66.8788 95.719 66.8998C95.6244 66.9338 95.5303 66.9674 95.4366 67.0008C95.24 67.0709 95.0453 67.1403 94.8525 67.2116C94.7688 67.2453 94.6892 67.2748 94.6055 67.3043C94.4844 67.3484 94.3633 67.3941 94.2432 67.4394C94.1682 67.4677 94.0935 67.4959 94.0195 67.5234L93.7181 67.6372C93.6639 67.6582 93.6092 67.6792 93.5546 67.7002C93.4446 67.7424 93.3346 67.7846 93.2284 67.8268C93.1674 67.8489 93.1079 67.8724 93.049 67.8957C93.0067 67.9124 92.9648 67.929 92.9228 67.9448C92.7679 68.008 92.6172 68.067 92.4707 68.126C92.375 68.1637 92.2835 68.2014 92.192 68.239L92.1903 68.2398C92.0396 68.303 91.8931 68.362 91.7507 68.4209C91.667 68.4547 91.5875 68.4884 91.508 68.5221C91.4052 68.565 91.3054 68.6078 91.2078 68.6498C91.1423 68.678 91.0778 68.7057 91.014 68.7327C90.9849 68.7434 90.9557 68.7558 90.9277 68.7677C90.9114 68.7746 90.8954 68.7813 90.8801 68.7875C90.6833 68.8718 90.495 68.9519 90.315 69.0319C90.2723 69.0496 90.2341 69.0673 90.1959 69.085C90.1704 69.0968 90.145 69.1086 90.1182 69.1204C90.0481 69.1503 89.978 69.1819 89.9089 69.213C89.8709 69.2302 89.8331 69.2472 89.7959 69.2637C89.7206 69.2932 89.6536 69.3269 89.5866 69.3564C89.5195 69.384 89.4545 69.4139 89.3918 69.4428C89.3685 69.4535 89.3456 69.4641 89.3229 69.4744C89.2972 69.4864 89.2714 69.4978 89.246 69.5091C89.2094 69.5253 89.1733 69.5412 89.1387 69.5586C89.0592 69.5965 88.9839 69.6303 88.9127 69.664L88.9124 69.6641C88.8581 69.6893 88.8038 69.7146 88.7536 69.7398L88.7034 69.7651V69.7272L88.4941 69.8325L88.4774 69.8704C88.147 70.0297 87.9346 70.1384 87.8453 70.1841C87.8282 70.1928 87.8157 70.1993 87.8076 70.2033L87.7993 70.1822C87.7679 70.1991 87.7354 70.2149 87.703 70.2307C87.6705 70.2465 87.6381 70.2623 87.6067 70.2791C87.4141 70.3761 87.2216 70.473 87.0249 70.5699C86.8323 70.6668 86.6398 70.7637 86.443 70.8606C84.9738 71.5896 83.4417 72.3354 81.872 73.077C81.6961 73.1613 81.5164 73.2457 81.3368 73.33C81.2471 73.3721 81.1575 73.4142 81.0683 73.4562C81.0558 73.4604 81.0432 73.4689 81.0307 73.4731L81.0284 73.4742C80.8324 73.5665 80.6364 73.6588 80.4363 73.7512C80.409 73.7639 80.3806 73.7765 80.3523 73.7892C80.3241 73.8018 80.2959 73.8144 80.2688 73.827Z"
                  fill="currentColor"
                ></path>
              </svg> */}
            </Link>
            <div className="responsive_header_wrap">
              <Link
                href={""}
                className="_list-links-redirect responsive_header_cntr common_style_inherit common_style"
              >
                {/* <div className="links"> */}
                <div className="_header_inner links">
                  <span className="" onClick={openModal}>
                    Bag
                  </span>
                  <span className="_header_bagItemQuantity">0</span>
                </div>
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
              <ul className="header_nav_links" onMouseEnter={()=>{setUpdate((prev)=>!prev)}}>
                {menu &&
                  menu.map((category, i) => (
                    <li className="_list-links-redirect" key={i} >
                      <div>
                        <Link
                          href={""}
                          className="links2 Nav-hover-link"
                          style={{ color }}
                        >
                          {category.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                <li className="_list-links-redirect">
                  <Link
                    href="/collections"
                    passHref
                    className="links2 Nav-hover-link"
                    style={{ color }}
                  >
                    Collections
                  </Link>
                </li>
                <li className="_list-links-redirect">
                  <Link
                    href={""}
                    className="links2 Nav-hover-link"
                    style={{ color }}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="header_nav_links_left">
              <button className="common_style_inherit common_style">
                <div className="_header_inner links2 _list-links-redirect">
                  {" "}
                  <span className="" onClick={openModal}>
                    Bag
                  </span>
                  <span className="_header_bagItemQuantity">0</span>
                </div>
              </button>
              <div className="header_nav_links_left_inner">
                <button className="common_style_inherit common_style">
                  <div className="_header_inner links2 _list-links-redirect">
                    {" "}
                    <span className="">Search</span>
                    <span className="_header_bagItemQuantity">
                      <IoSearch />
                    </span>
                  </div>
                </button>
                <button className="common_style_inherit common_style">
                  <div className="_header_inner links2 _list-links-redirect">
                    {" "}
                    <span className="">IN</span>
                    <span className="_header_bagItemQuantity">
                      <FaEuroSign />
                    </span>
                  </div>
                </button>
                <button className="common_style_inherit common_style">
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
          </div>
        </header>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          className={customStyles}
          contentLabel="Example Modal"
        >
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Navbar;
