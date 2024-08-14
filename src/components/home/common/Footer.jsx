import Link from "next/link";
import React from "react";
import Button from "./Button";

const Footer = () => {
  return (
    <div className="Footer_wrapper">
      <div className="Footer_cntr">
        <nav className="fotter_nav" aria-label="Primary navigation links">
          <ul className="footer_nav_ul">
            <li className="footer_nav_ul_list _list-links">
              <p className="">About</p>
              <ul>
                <li className="_list-links _list-links-redirect">
                  <Link href={""} className="footer_links links">
                    Our Story
                  </Link>
                </li>
                <li className="_list-links _list-links-redirect">
                  <Link href={""} className="footer_links links">
                    Paris Boutique
                  </Link>
                </li>
                <li className="_list-links _list-links-redirect">
                  <Link href={""} className="footer_links links">
                    Stockists
                  </Link>
                </li>
                <li className="_list-links _list-links-redirect">
                  <Link href={""} className="footer_links links">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </li>
            <li className="footer_nav_ul_list _list-links">
              <p className="">Customer Care</p>
              <ul>
                <li className="_list-links _list-links-redirect">
                  <Link href={""} className="footer_links links">
                    Contact
                  </Link>
                </li>
                <li className="_list-links _list-links-redirect">
                  <Link href={""} className="footer_links links">
                    Returns & Exchanges
                  </Link>
                </li>
                <li className="_list-links _list-links-redirect">
                  <Link href={""} className="footer_links links">
                    General Sizing
                  </Link>
                </li>
                <li className="_list-links _list-links-redirect">
                  <Link href={""} className="footer_links links">
                    FAQs
                  </Link>
                </li>
              </ul>
            </li>
            <li className="footer_nav_ul_list _list-links">
              <p className="">Social</p>
              <ul>
                <li className="_list-links _list-links-redirect">
                  <Link href={""} className="footer_links links">
                    Instagram
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="_btn-width">
          <div className="footer_nav_signup_btn_cntr">
            <div className="footer_nav_signup_btn_align">
              <Button className="_btn-width">Sign up to the newsletter</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="Footer_SocialLinks_cntr">
        <nav aria-label="Additional navigation links">
          <ul className="Footer_SocialLinks_bottom">
            <li className="">
              <Link href={""} className="links">
                Privacy Policy
              </Link>
            </li>
            <li className="">
              <Link href={""} className="links">
                Terms and Conditions
              </Link>
            </li>
            <li className="">
              <Link href={""} className="links">
                Accessibility
              </Link>
            </li>
            <li className="">
              <Link href={""} className="links">
                Credits
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
