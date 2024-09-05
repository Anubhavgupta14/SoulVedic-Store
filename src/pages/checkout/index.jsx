import React, { useState, useEffect } from "react";
import { AiOutlineTag } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Const } from "../../../utils/Constants";
import { MdOutlineErrorOutline } from "react-icons/md";
import { countrys } from "../../helpers/country";
import { Savecards } from "../../../api_fetch/admin/User";
import { useRouter } from "next/router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import {
  Checkoutitem,
  Saveorders,
  CheckAddress,
  Getcart,
} from "../../../api_fetch/admin/Checkout";
import { FinalPrice } from "../../../api_fetch/admin/Cart";
import Link from "next/link";

const Checkout2 = () => {
  const router = useRouter();
  const cartdata = useSelector((state) => state.cart);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [userid, Setuserid] = useState("");
  const [open, Setopen] = useState(false);
  const [open2, Setopen2] = useState(false);
  const [newadd, setNewadd] = useState(false);
  const [addressdata, Setaddressdata] = useState(null);
  const [index, Setindex] = useState(0);
  const [prices, setPrices] = useState([]);
  const [addresssaved, Setaddresssaved] = useState(false);
  const [visible, setVisibile] = useState(true);
  const [temp, Settemp] = useState(true);
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [inputs, setInputs] = useState([
    {
      title: "Email for order confirmation*",
      error: "Enter an email address like example@mysite.com",
      input: "",
      type: "String",
    },
    {
      title: "First Name*",
      error: "Enter a first name",
      input: "",
      type: "String",
    },
    {
      title: "Last Name*",
      error: "Enter a last name",
      input: "",
      type: "String",
    },
    {
      title: "Phone*",
      error: "Enter a phone name",
      input: "",
      type: "Number",
    },
    {
      title: "Flat or house number*",
      error: "This field is required",
      input: "",
      type: "Number",
    },
  ]);
  const [Delivery, setDelivery] = useState([
    {
      title: "Country/Region *",
      error: "This field is required",
      input: "India",
      type: "String",
    },
    {
      title: "Address *",
      error: "Enter an address",
      input: "",
      type: "String",
    },
    {
      title: "City *",
      error: "Enter a city",
      input: "",
      type: "String",
    },
    {
      title: "Region *",
      error: "This field is required",
      input: "",
      type: "String",
    },
    {
      title: "Zip / Postal Code *",
      error: "Enter a zip/postal code",
      input: "",
      type: "Number",
    },
  ]);
  const [details, setDetails] = useState({});
  const [isBilling, setIsBilling] = useState(false);
  const [billingDetails, setBillingDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [errors, setErrors] = useState({});
  const generateOrderId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 10;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  const saveorder = async () => {
    try {
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      let order = cartdata.cart.map((item) => ({
        ...item,
        orderNo: newOrderId,
      }));
      const responseData = await Saveorders({ userId: userid, orders: order });

      // const responseData = await response.json();
      //   console.log(responseData)
    } catch (err) {
      console.log(err);
    }
  };
  const saveordernologin = async () => {
    try {
      const responseData = await Saveorders({
        userId: inputs[0].input,
        orders: cartdata.cart,
      });
      // const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGenerateOrderId = async () => {
    if (validateFields()) {
      localStorage.removeItem("persist:root");
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const responseData = await Checkoutitem(token);

          // const responseData = await response.json();
          //   console.log(responseData)
        } catch (err) {
          console.log(err);
        }
        await saveorder();
        await handleSubmit();
        router.push(`/paymentstatus?id=${orderId}&amount=${total}`);
      } else {
        saveordernologin();
        window.location.reload();
        router.push(`/paymentstatus?id=${orderId}&amount=${total}`);
      }
    }
  };

  const checkErrors = () => {
    let hasErrors = false;
    const newInputs = [...inputs];
    const newDelivery = [...Delivery];

    // Check errors in inputs
    newInputs.forEach((input, index) => {
      if (index === 0 && localStorage.getItem("token")) {
        input.errorVisible = false;
        return; // Skip setting error visibility for first element if token is present
      }

      if (!input.input.trim()) {
        hasErrors = true;
        input.errorVisible = true;
      } else {
        input.errorVisible = false;
      }
    });

    // Check errors in Delivery
    newDelivery.forEach((input) => {
      if (!input.input.trim()) {
        hasErrors = true;
        input.errorVisible = true;
      } else {
        input.errorVisible = false;
      }
    });

    setInputs(newInputs);
    setDelivery(newDelivery);

    return hasErrors;
  };
  const handleSubmit = async (event) => {
    // Prevent default form submission
    // event.preventDefault();

    const hasErrors = false;

    // If there are no errors, set addresssaved to true and send the data to the API
    if (!hasErrors) {
      fetch(`${Const.Link}api/user/saveaddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userid, addressData: details }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save address");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Address saved successfully:", data);
          setIsUpdated((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error saving address:", error);
        });
      if (Object.keys(paymentDetails).length != 0) {
        await Savecards({ email: userid, ...paymentDetails });
      }
    }
  };
  const handleSubmitnologin = (event) => {
    // Prevent default form submission
    event.preventDefault();
    const hasErrors = checkErrors();

    // If there are no errors, set addresssaved to true and send the data to the API
    if (!hasErrors) {
      Setaddresssaved(true);

      // Construct the data to send to the API
      const requestData = {
        firstname: inputs[1].input,
        lastname: inputs[2].input,
        flat: inputs[4].input,
        address: Delivery[1].input,
        phone: inputs[3].input,
        city: Delivery[2].input,
        country: Delivery[0].input,
        pincode: Delivery[4].input,
      };

      // Make a POST request to the API
      fetch(`${Const.Link}api/user/saveaddressnologin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: inputs[0].input,
          addressData: requestData,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save address");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Address saved successfully:", data);
        })
        .catch((error) => {
          console.error("Error saving address:", error);
        });
    } else {
      // There are errors, do not set addresssaved to true
      Setaddresssaved(false);
    }
  };

  useEffect(() => {
    let func = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        setUser(true);
        const data = await Getcart(token);
        if (data) {
          //  const data = await response.json();
          Setuserid(data.userId);
          setDetails({ email: data.userId });
        }
      } catch (err) {
        console.log(err);
      }
    };
    let getdata = () => {
      setCart(cartdata);
    };

    func();
    getdata();
  }, []);
  const fetchaddress = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const data = await CheckAddress(token);
    if (data.error) {
      setNewadd(true);
      return;
    }
    if (data) {
      Setaddressdata(data);
    } else {
      setNewadd(true);
    }
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleBillingDetailChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!paymentDetails.cardnumber) {
      newErrors.cardnumber = "Enter a card number";
    }
    if (!paymentDetails.expirydate) {
      newErrors.expirydate = "Enter a valid expiration date";
    }
    if (!paymentDetails.cvv) {
      newErrors.cvv = "Enter the CVV or security code on your card";
    }
    if (!paymentDetails.cardholder) {
      newErrors.cardholder = "Enter the name on the card";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setTimeout(() => {
      fetchaddress();
    }, 500);
  }, [isUpdated]);

  useEffect(() => {
    const fetchPrices = async () => {
      if (cart) {
        const updatedPrices = await Promise.all(
          cart.cart.map(async (el) => {
            // Start from index 1
            try {
              const data = await FinalPrice({
                productid: el.productid,
                variants: el.variants[0], // assuming variants is an array and you want to send the first variant
              });
              if (data.err) {
                return 100;
              }
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
          sum += updatedPrices[i] * cartdata.cart[i].qty;
        }
        setTotal(sum);
      }
    };

    fetchPrices();
  }, [cart]);

  console.log(details, "details");
  console.log(paymentDetails, "detailspayment");

  return (
    <>
      <div
        className="_btn_wrapper _btn_height _w-full back bg-white"
        onClick={() => {
          router.back();
        }}
      >
        <IoIosArrowRoundBack style={{ fontSize: "1rem" }} />
        <p>Back</p>
      </div>
      <div className="checkout-cont">
        <div className="checkout-left">
          <header role="banner" className="checkout_header">
            <span>
              <Link href={""} className="checkout_header_titile">
                {/* <img
                src="https://cdn.shopify.com/s/files/1/0030/2946/7203/files/NourHammour_Logo_Transparent_Black_x320.png?v=1693321966"
                alt=""
              /> */}
                <h1>SOULVEDIC</h1>
              </Link>
            </span>
            <span>
              <Link href={""}>
                <span>
                  <IoBagHandleOutline />
                </span>
              </Link>
            </span>
          </header>
          <div className="checkout-main">
            <div className="contact_container">
              <div className="contact_text_cntr">
                <h2 className="same_style_text">Contact</h2>
                {!user && <Link href={"/login"}>Login</Link>}
              </div>
              <div className="contact_input_cntr">
                <input
                  type="email"
                  placeholder="Email"
                  value={details?.email ?? ""}
                  name="email"
                  onChange={handleDetailChange}
                />
              </div>
              <label class="checkbox-container">
                <input type="checkbox" />
                <span class="checkmark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    focusable="false"
                    aria-hidden="true"
                    class="arrow"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m12.1 2.8-5.877 8.843a.35.35 0 0 1-.54.054L1.4 7.4"
                    ></path>
                  </svg>
                </span>
                <h6 className="">Email me with news and offers</h6>
              </label>
            </div>
            <div className="Delivery_container">
              <h2 className="same_style_text">Delivery</h2>
              <div className="Delivery_cntr_form">
                <div className="Delivery_input_cntr">
                  <label htmlFor="Select0">
                    {/* <span>Country/Region</span> */}
                    <div>
                      <select
                        name="country"
                        id=""
                        required
                        onChange={handleDetailChange}
                        autoComplete="shipping country"
                      >
                        <option value="">Country/Region</option>
                        {countrys.map((el, i) => (
                          <option value={el.name}>
                            {el.code} {el.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                  <div className="Name_input_cntr">
                    <input
                      required
                      type="text"
                      placeholder="First name"
                      name="firstname"
                      onChange={handleDetailChange}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Last name"
                      name="lastname"
                      onChange={handleDetailChange}
                    />
                  </div>
                  <div className="Company_input_cntr">
                    <input
                      type="text"
                      placeholder="Company(optional)"
                      onChange={handleDetailChange}
                      name="company"
                    />
                  </div>
                  <div className="pincode_city_input_cntr">
                    <input
                      required
                      type="text"
                      placeholder="postal code"
                      onChange={handleDetailChange}
                      name="pincode"
                    />
                    <input
                      required
                      type="text"
                      placeholder="city"
                      onChange={handleDetailChange}
                      name="city"
                    />
                  </div>
                  <div className="Address_input_cntr">
                    <input
                      required
                      type="text"
                      placeholder="Address"
                      onChange={handleDetailChange}
                      name="addressline1"
                    />
                  </div>
                  <div className="Appartment_input_cntr">
                    <input
                      type="text"
                      placeholder="Appartment, suite, etc. (optional)"
                      onChange={handleDetailChange}
                      name="addressline2"
                    />
                  </div>
                  <div className="Phone_input_cntr">
                    <input
                      required
                      type="number"
                      placeholder="Phone"
                      aria-required="true"
                      autocomplete="off"
                      onChange={handleDetailChange}
                      name="phone"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="Shipping_container">
              <div className="Shipping_title_cntr">
                <h2 className="same_style_text">Shipping method</h2>
              </div>
              {Object.keys(details) != 0 ? (
                <div className="Shipping_method_cntr">
                  <p>Enter your shipping address</p>
                </div>
              ) : (
                <div className="Shipping_method_cntr">
                  <p>Free</p>
                </div>
              )}
            </div>
            <div className="Payment_container">
              <div className="payment_title_cntr">
                <h2 className="same_style_text">Payment</h2>
                <p>All transactions are secure and encrypted.</p>
              </div>
              <div className="payment_inner_container_bg">
                <fieldset>
                  <legend class="payment_choose">
                    Choose a payment method
                  </legend>
                  <div className="all_payment_input_cntr">
                    <label htmlFor="basic-creditCards">
                      <div className="cards_inner_content">
                        <div className="checkbox_cntr_paypal">
                          <input
                            type="radio"
                            name="basic"
                            id="basic-PAYPAL_EXPRESS"
                          />
                        </div>
                        <div className="credit_card_cntr">
                          <span>Credit card</span>
                          <div className="cards_cntr">
                            <div className="cards_img_cntr">
                              <img
                                src="../../../0169695890db3db16bfe.svg"
                                alt=""
                              />
                              <img src="../../../card_svg2.svg" alt="" />
                              <img src="../../../card_svg3.svg" alt="" />
                              <img src="../../../card_svg4.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                    <div className="basic-creditCards-collapsible">
                      <div>
                        <div className="card_details_cntr">
                          <div className="card_details_inner_cntr">
                            <div className="card_details_inner_Top_cntr">
                              <div className="card_number_details_cntr">
                                <div className="card_details_cover_cntr">
                                  <input
                                    type="text"
                                    placeholder="Card number"
                                    value={paymentDetails?.cardnumber ?? null}
                                    onChange={handlePaymentChange}
                                    name="cardnumber"
                                  />
                                  <IoBagHandleOutline />
                                </div>
                                {errors.cardnumber && (
                                  <p
                                    id="error-for-number"
                                    className="card-details-error"
                                  >
                                    Enter a card number
                                  </p>
                                )}
                              </div>
                              <div className="card_details_input_cntr">
                                <div className="input_grid_style_for_all">
                                  <input
                                    required
                                    type="text"
                                    name="expirydate"
                                    data-current-field="expiry"
                                    aria-describedby="error-for-expiry tooltip-for-expiry"
                                    placeholder="Expiration date (MM / YY)"
                                    value={paymentDetails?.expirydate ?? null}
                                    onChange={handlePaymentChange}
                                  />
                                  {errors.expirydate && (
                                    <span>Enter a valid expiration date</span>
                                  )}
                                </div>
                                <div className="input_grid_style_for_all">
                                  <input
                                    required
                                    type="text"
                                    autocomplete="cc-csc"
                                    id="verification_value"
                                    name="cvv"
                                    inputmode="numeric"
                                    pattern="[0-9]*"
                                    aria-describedby="error-for-verification_value tooltip-for-verification_value"
                                    placeholder="Security code"
                                    value={paymentDetails?.cvv ?? null}
                                    onChange={handlePaymentChange}
                                  />
                                  {errors.cvv && (
                                    <span>
                                      Enter the CVV or security code on your
                                      card
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="Name_on_card_cntr">
                                <div className="Name_on_card_input_cntr">
                                  <input
                                    type="text"
                                    placeholder="Name on card"
                                    value={paymentDetails?.cardholder ?? ""}
                                    onChange={handlePaymentChange}
                                    name="cardholder"
                                  />
                                </div>
                                <label class="checkbox-container">
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      setIsBilling(!isBilling);
                                    }}
                                  />
                                  <span class="checkmark">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 14 14"
                                      focusable="false"
                                      aria-hidden="true"
                                      class="arrow"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m12.1 2.8-5.877 8.843a.35.35 0 0 1-.54.054L1.4 7.4"
                                      ></path>
                                    </svg>
                                  </span>
                                  <h6 className="">
                                    Use shipping address as billing address
                                  </h6>
                                </label>
                              </div>
                            </div>
                            <div className="card_details_inner_Btm_cntr">
                              <div>
                                <div className="Billing_section">
                                  <h2 className="same_style_text">
                                    Billing address
                                  </h2>
                                  <div className="Delivery_cntr_form">
                                    <div className="Delivery_input_cntr">
                                      <label htmlFor="Select0">
                                        {/* <span>Country/Region</span> */}
                                        <div>
                                          <select
                                            name="country"
                                            id=""
                                            required
                                            value={
                                              isBilling
                                                ? details.country
                                                : billingDetails.country
                                            }
                                            onChange={handleBillingDetailChange}
                                            autoComplete="shipping country"
                                          >
                                            <option value="">
                                              Country/Region
                                            </option>
                                            {countrys.map((el, i) => (
                                              <option value={el.name}>
                                                {el.code} {el.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </label>
                                      <div className="Name_input_cntr">
                                        <input
                                          required
                                          type="text"
                                          placeholder="First name"
                                          style={{
                                            backgroundColor:
                                              "rgb(245 243 243 / 60%)",
                                            border: "1px solid #dedede",
                                          }}
                                          name="firstname"
                                          onChange={handleBillingDetailChange}
                                          value={
                                            isBilling
                                              ? details.firstname
                                              : billingDetails.firstname
                                          }
                                        />
                                        <input
                                          required
                                          type="text"
                                          placeholder="Last name"
                                          name="lastname"
                                          style={{
                                            backgroundColor:
                                              "rgb(245 243 243 / 60%)",
                                            border: "1px solid #dedede",
                                          }}
                                          onChange={handleBillingDetailChange}
                                          value={
                                            isBilling
                                              ? details.lastname
                                              : billingDetails.lastname
                                          }
                                        />
                                      </div>
                                      <div className="Company_input_cntr">
                                        <input
                                          type="text"
                                          placeholder="Company(optional)"
                                          name="company"
                                          style={{
                                            backgroundColor:
                                              "rgb(245 243 243 / 60%)",
                                            border: "1px solid #dedede",
                                          }}
                                          onChange={handleBillingDetailChange}
                                          value={
                                            isBilling
                                              ? details.company
                                              : billingDetails.company
                                          }
                                        />
                                      </div>
                                      <div className="pincode_city_input_cntr">
                                        <input
                                          required
                                          type="text"
                                          placeholder="postal code"
                                          name="pincode"
                                          style={{
                                            backgroundColor:
                                              "rgb(245 243 243 / 60%)",
                                            border: "1px solid #dedede",
                                          }}
                                          onChange={handleBillingDetailChange}
                                          value={
                                            isBilling
                                              ? details.pincode
                                              : billingDetails.pincode
                                          }
                                        />
                                        <input
                                          required
                                          type="text"
                                          placeholder="city"
                                          name="city"
                                          style={{
                                            backgroundColor:
                                              "rgb(245 243 243 / 60%)",
                                            border: "1px solid #dedede",
                                          }}
                                          onChange={handleBillingDetailChange}
                                          value={
                                            isBilling
                                              ? details.city
                                              : billingDetails.city
                                          }
                                        />
                                      </div>
                                      <div className="Address_input_cntr">
                                        <input
                                          required
                                          type="text"
                                          placeholder="Address"
                                          style={{
                                            backgroundColor:
                                              "rgb(245 243 243 / 60%)",
                                            border: "1px solid #dedede",
                                          }}
                                          name="addressline1"
                                          onChange={handleBillingDetailChange}
                                          value={
                                            isBilling
                                              ? details.addressline1
                                              : billingDetails.addressline1
                                          }
                                        />
                                      </div>
                                      <div className="Appartment_input_cntr">
                                        <input
                                          type="text"
                                          placeholder="Appartment, suite, etc. (optional)"
                                          name="addressline2"
                                          style={{
                                            backgroundColor:
                                              "rgb(245 243 243 / 60%)",
                                            border: "1px solid #dedede",
                                          }}
                                          onChange={handleBillingDetailChange}
                                          value={
                                            isBilling
                                              ? details.addressline2
                                              : billingDetails.addressline2
                                          }
                                        />
                                      </div>
                                      <div className="Phone_input_cntr">
                                        <input
                                          required
                                          type="number"
                                          style={{
                                            backgroundColor:
                                              "rgb(245 243 243 / 60%)",
                                            border: "1px solid #dedede",
                                          }}
                                          placeholder="Phone"
                                          aria-required="true"
                                          autocomplete="off"
                                          name="phone"
                                          onChange={handleBillingDetailChange}
                                          value={
                                            isBilling
                                              ? details.phone
                                              : billingDetails.phone
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <button
              aria-hidden="true"
              style={{ marginTop: "30px" }}
              onClick={handleGenerateOrderId}
            >
              Pay now
            </button>
          </div>
        </div>

        <div className="checkout-right">
          <div className="final-checkout-cont">
            <div className="checkout-t">
              Order Summary ({cart && cart.itemcount})
            </div>

            <div className="checkout-items-cont">
              {cart &&
                cart.cart.map((item, index, ar) => {
                  const price = prices[index];
                  return (
                    <div
                      key={index}
                      className="summary-cont"
                      style={
                        index < ar.length - 1 ? {} : { borderBottom: "none" }
                      }
                    >
                      {!price ? (
                        //   <FinalpriceLoader2 />
                        <></>
                      ) : (
                        <>
                          <div className="summary-price"> &#8377; {price}</div>
                        </>
                      )}
                      <div className="summary-img-cont">
                        <img
                          alt=""
                          src={item.img}
                          style={{ maxHeight: "100%" }}
                        />
                      </div>
                      <div className="summary-details">
                        <div className="summary-name">{item.name}</div>
                        {cart &&
                          item.variants.map((op, j) => (
                            <div key={j} className="varients-cart">
                              {Object.keys(op).map((key, index, arr) => (
                                <div
                                  key={index}
                                  style={{
                                    position: "relative",
                                    display: "flex",
                                  }}
                                  className="cart_item_det"
                                >
                                  <p className="cart-p" key={index}>
                                    <span>{op[key]}</span>
                                    {index < arr.length - 1 && " /"}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ))}
                        <div style={{ fontSize: "12px" }}> Qty: {item.qty}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className={`promo-cont t3`}>
              <input
                type="text"
                className="promo-input"
                placeholder="Discount Code or Gift Card"
              />
              <button className="_btn_wrapper _btn_height _w-full ApplyBtn">
                Apply
              </button>
            </div>
            <div className="checkout-price-cont">
              <div className="cpp">
                Subtotal:
                {!total ? (
                  // <FinalpriceLoader2 />
                  <></>
                ) : (
                  <div className="cpp-p"> &#8377; {total}</div>
                )}
              </div>
              <div className="cpp">
                Shipping:
                <div className="cpp-p"> &#8377; 100</div>
              </div>
              <div className="cpp">
                Taxes:
                <div className="cpp-p"> &#8377; {0.0}</div>
              </div>
            </div>
            <div className="checkout-total">
              Total:
              {!total ? (
                //   <FinalpriceLoader2 />
                <></>
              ) : (
                <div className="checkout-price">&#8377; {total + 100}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout2;
