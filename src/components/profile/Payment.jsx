import React, { useState } from "react";
import { useEffect } from "react";
// import { useLoaderData, useNavigate } from "react-router-dom";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiVisaLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Const } from "../../../utils/Constants";
import { GoPlus } from "react-icons/go";
// import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import Addpay from "./PopUpCard";
// import Profilebtn from "../common/Profilebtn2"
import { IoIosArrowDown } from "react-icons/io";
import { Getcards } from "../../../api_fetch/admin/User";

const Layout = ({ email }) => {
  // const navigate = useNavigate();
  // let productsjson = useLoaderData();
  const [open, Setopen] = useState(false);

  const [userData, setUserData] = useState({
    cardnumber: "",
    expirydate: "",
    cvv: "",
    cardholder: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
    state: "",
    phone: "",
    company: "",
    gst: "",
  });

  const [paymentcard, Setpaymentcard] = useState([]);
  console.log("payment card", paymentcard);

  const fetchUserData = async () => {
    try {
      // Extract JWT token from localStorage
      const response = await fetch(`${Const.Link}api/user/getcard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: email }),
      });

      const data = await Getcards({ userId: email });

      if (!response.ok) {
        console.log("error");
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      console.log("Data :", userData);
      Setpaymentcard(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {/* <Toaster /> */}
      <Tooltip id="my-tooltip" style={{ width: "20vw" }} />
      <div className="order-div" style={{ marginInline: "-31px" }}>
        <div className="pay-top2">
          <div className="pay-head">
            <h4>Payment Method</h4>
            <p>
              Easily manage your saved payment methods for seamless checkout
              experiences.
            </p>
            <p>
              Your information is kept safe and secure with us.{" "}
              {/* <span style={{ color: "#3b82f6", cursor:'pointer' }}>
               Learn more.
            </span> */}
            </p>
          </div>
          <div className="fixed-right">
            <div
              className="_btn_wrapper _btn_height _w-full"
              onClick={() => {
                Setopen(true);
              }}
              style={{ width: "200px" }}
            >
              Add a Payment Method
            </div>
          </div>
        </div>

        <div className="pay-outer">
          <div className="my-2"></div>

          {paymentcard.length == 0 ? (
            <div className="no-order-div">
              <div>
                <p className="no-order-p">There is no payment method to show</p>
              </div>
            </div>
          ) : (
            <div className="cards">
              {paymentcard.length !== 0 &&
                paymentcard.map((el, i) => (
                  <div className="card1" key={i}>
                    <div className="card1-head">
                      <div className="visa-div">
                        <RiVisaLine className="visa" />
                      </div>
                      <div className="actions">
                        {/* <p style={{fontSize:'16px'}}>
                  Primary <IoIosArrowDown />
                </p> */}
                        {/* <Profilebtn/> */}
                      </div>
                    </div>

                    <div className="card-detail">
                      <p>
                        <GoDotFill className="dot" />
                        <GoDotFill className="dot" />
                        <GoDotFill className="dot" />
                        <GoDotFill className="dot" />
                        {el.cardnumber && el.cardnumber.toString().slice(-4)}
                      </p>
                      <p className="card-holder">
                        {el.firstname} {el.lastname}
                      </p>
                    </div>
                    {/* <p className="subs">6 active Premium subscriptions</p> */}
                  </div>
                ))}
              {open && (
                <Addpay
                  email={email}
                  open={open}
                  Setopen={Setopen}
                  userData={userData}
                  setUserData={setUserData}
                  paymentcard={paymentcard}
                  Setpaymentcard={Setpaymentcard}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Layout;
