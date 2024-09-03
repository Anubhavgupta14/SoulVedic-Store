import React, { useState, useEffect } from "react";
import { AiOutlineTag } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Const } from "../../../utils/Constants";
import { MdOutlineErrorOutline } from "react-icons/md";
import { countrys } from "../../helpers/country";
import { Savecards } from "../../../api_fetch/admin/User";
import { useRouter } from "next/router";
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

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].input = value;
    setInputs(newInputs);
  };
  const tempfunc = () => {
    Settemp(false);
    setNewadd(true);
  };
  const tempfunc2 = () => {
    Settemp(false);
    setNewadd(true);
  };
  const handleInputChange2 = (index, value) => {
    const newInputs = [...Delivery];
    newInputs[index].input = value;
    setDelivery(newInputs);
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
              <div className="Shipping_method_cntr">
                <p>Enter your shipping address</p>
              </div>
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
                                <p
                                  id="error-for-number"
                                  className="card-details-error"
                                >
                                  Enter a card number
                                </p>
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
                                  <span>Enter a valid expiration date</span>
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
                                  <span>
                                    Enter the CVV or security code on your card
                                  </span>
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
                                            value={isBilling ? details.country:billingDetails.country}
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
                                          name="firstname"
                                          onChange={handleBillingDetailChange}
                                          value={isBilling ? details.firstname : billingDetails.firstname}
                                        />
                                        <input
                                          required
                                          type="text"
                                          placeholder="Last name"
                                          name="lastname"
                                          onChange={handleBillingDetailChange}
                                          value={isBilling ? details.lastname : billingDetails.lastname}
                                        />
                                      </div>
                                      <div className="Company_input_cntr">
                                        <input
                                          type="text"
                                          placeholder="Company(optional)"
                                          name="company"
                                          onChange={handleBillingDetailChange}
                                          value={isBilling ? details.company : billingDetails.company}
                                        />
                                      </div>
                                      <div className="pincode_city_input_cntr">
                                        <input
                                          required
                                          type="text"
                                          placeholder="postal code"
                                          name="pincode"
                                          onChange={handleBillingDetailChange}
                                          value={isBilling ? details.pincode : billingDetails.pincode}
                                        />
                                        <input
                                          required
                                          type="text"
                                          placeholder="city"
                                          name="city"
                                          onChange={handleBillingDetailChange}
                                          value={isBilling ? details.city : billingDetails.city}
                                        />
                                      </div>
                                      <div className="Address_input_cntr">
                                        <input
                                          required
                                          type="text"
                                          placeholder="Address"
                                          name="addressline1"
                                          onChange={handleBillingDetailChange}
                                          value={isBilling ? details.addressline1 : billingDetails.addressline1}
                                        />
                                      </div>
                                      <div className="Appartment_input_cntr">
                                        <input
                                          type="text"
                                          placeholder="Appartment, suite, etc. (optional)"
                                          name="addressline2"
                                          onChange={handleBillingDetailChange}
                                          value={isBilling ? details.addressline2 : billingDetails.addressline2}
                                        />
                                      </div>
                                      <div className="Phone_input_cntr">
                                        <input
                                          required
                                          type="number"
                                          placeholder="Phone"
                                          aria-required="true"
                                          autocomplete="off"
                                          name="phone"
                                          onChange={handleBillingDetailChange}
                                          value={isBilling ? details.phone : billingDetails.phone}
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
            <div className="paypal_section">
              <label htmlFor="basic-PAYPAL_EXPRESS">
                <div className="section_label_inner">
                  <div className="checkbox_cntr_paypal">
                    <input
                      type="radio"
                      name="basic"
                      id="basic-PAYPAL_EXPRESS"
                    />
                  </div>
                  <div className="Paypal_main_cntr">
                    <div>
                      <span>PayPal</span>
                    </div>
                    <div className="Paypal_svg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 196 50"
                        role="img"
                        aria-label="PayPal"
                        class="RULId"
                      >
                        <g clip-path="url(#paypal-logo_svg__a)">
                          <path
                            fill="#253B80"
                            fill-rule="evenodd"
                            d="M62.268 11.182h10.816c3.62 0 6.346 1 7.884 2.893 1.4 1.723 1.863 4.183 1.379 7.315-1.074 7.157-5.186 10.769-12.31 10.769h-3.425c-.738 0-1.37.563-1.483 1.33l-1.18 7.837c-.116.767-.745 1.33-1.485 1.33H57.3c-.555 0-.979-.516-.892-1.09l4.375-29.055c.115-.766.745-1.33 1.485-1.33Zm5.634 14.678c2.867 0 5.833 0 6.424-4.066.217-1.428.043-2.462-.525-3.158-.952-1.166-2.794-1.166-4.748-1.166h-.748c-.442 0-.822.338-.89.797L66.27 25.86zM100.235 21.664h5.179c.554 0 .976.518.887 1.09l-2.799 18.571c-.117.767-.743 1.33-1.485 1.33h-4.665c-.552 0-.976-.516-.89-1.093l.232-1.507s-2.558 3.106-7.17 3.106c-2.686 0-4.945-.812-6.523-2.76-1.721-2.12-2.425-5.158-1.93-8.336.952-6.37 5.84-10.912 11.564-10.912 2.496 0 4.996.57 6.118 2.275l.362.55.23-1.517a.91.91 0 0 1 .89-.797m-7.884 15.74c2.996 0 5.344-2.08 5.844-5.18.226-1.501-.087-2.863-.876-3.839-.788-.966-1.984-1.478-3.454-1.478-2.95 0-5.338 2.15-5.804 5.223-.244 1.507.047 2.86.812 3.812.772.958 1.974 1.463 3.478 1.463Z"
                            clip-rule="evenodd"
                          ></path>
                          <path
                            fill="#253B80"
                            d="M132.999 21.663h-5.204c-.497 0-.963.259-1.245.69l-7.179 11.079-3.042-10.646c-.192-.666-.779-1.123-1.443-1.123h-5.114c-.622 0-1.054.636-.856 1.25l5.733 17.625-5.39 7.97c-.424.629.003 1.492.736 1.492h5.198c.493 0 .955-.252 1.235-.676l17.312-26.178c.414-.626-.011-1.483-.741-1.483"
                          ></path>
                          <path
                            fill="#179BD7"
                            fill-rule="evenodd"
                            d="M139.415 11.182h10.818c3.62 0 6.345 1 7.88 2.893 1.4 1.723 1.867 4.183 1.381 7.315-1.075 7.157-5.186 10.769-12.312 10.769h-3.423c-.738 0-1.369.563-1.483 1.33l-1.242 8.237c-.08.537-.521.93-1.037.93h-5.551c-.552 0-.976-.516-.889-1.09l4.375-29.055c.115-.766.744-1.33 1.483-1.33Zm5.642 14.678c2.869 0 5.835 0 6.425-4.066.216-1.428.044-2.462-.524-3.158-.952-1.166-2.796-1.166-4.748-1.166h-.748c-.444 0-.821.338-.889.797l-1.146 7.593zM177.383 21.663h5.176c.555 0 .979.52.894 1.09l-2.801 18.572c-.116.767-.745 1.33-1.484 1.33h-4.664c-.555 0-.979-.516-.892-1.093l.231-1.508s-2.557 3.107-7.169 3.107c-2.687 0-4.942-.812-6.524-2.76-1.72-2.12-2.421-5.158-1.928-8.336.953-6.37 5.84-10.912 11.563-10.912 2.496 0 4.995.57 6.116 2.275l.364.55.229-1.518a.91.91 0 0 1 .889-.797m-7.881 15.742c2.995 0 5.347-2.081 5.844-5.181.229-1.501-.084-2.863-.877-3.84-.787-.965-1.983-1.477-3.454-1.477-2.949 0-5.334 2.149-5.804 5.222-.24 1.508.048 2.862.813 3.813.772.957 1.977 1.463 3.478 1.463"
                            clip-rule="evenodd"
                          ></path>
                          <path
                            fill="#179BD7"
                            d="m188.67 11.979-4.44 29.588c-.087.573.337 1.09.889 1.09h4.463c.742 0 1.371-.563 1.485-1.33l4.378-29.055c.087-.573-.337-1.092-.889-1.092h-4.998c-.441.002-.82.34-.888.799"
                          ></path>
                          <path
                            fill="#253B80"
                            d="m11.493 48.304.827-5.504-1.842-.045H1.68L7.794 2.141a.54.54 0 0 1 .17-.318.5.5 0 0 1 .327-.126h14.834c4.925 0 8.324 1.073 10.098 3.193.832.994 1.362 2.032 1.618 3.176.27 1.2.274 2.632.011 4.38l-.019.128v1.12l.832.494c.7.39 1.258.835 1.685 1.345.711.85 1.172 1.93 1.366 3.211.2 1.317.134 2.885-.194 4.66-.38 2.04-.994 3.818-1.822 5.273-.763 1.34-1.734 2.452-2.887 3.314-1.1.818-2.408 1.44-3.887 1.837-1.433.391-3.067.588-4.859.588h-1.154c-.826 0-1.628.312-2.257.87a3.7 3.7 0 0 0-1.177 2.2l-.087.496-1.46 9.7-.067.357c-.018.112-.048.169-.092.207a.24.24 0 0 1-.152.058z"
                          ></path>
                          <path
                            fill="#179BD7"
                            d="M36.451 12.703q-.066.445-.152.911c-1.956 10.523-8.65 14.158-17.197 14.158h-4.353c-1.045 0-1.926.795-2.089 1.876l-2.228 14.805L9.8 48.65c-.106.709.416 1.349 1.099 1.349h7.72c.913 0 1.69-.696 1.834-1.64l.076-.412 1.453-9.662.094-.53c.142-.948.92-1.644 1.834-1.644h1.155c7.479 0 13.334-3.181 15.045-12.387.715-3.845.345-7.056-1.547-9.314-.572-.681-1.283-1.246-2.113-1.707Z"
                          ></path>
                          <path
                            fill="#222D65"
                            d="M34.4 11.847a15 15 0 0 0-1.902-.442c-1.173-.199-2.459-.293-3.836-.293H17.034c-.286 0-.558.068-.802.19-.536.27-.934.802-1.03 1.453l-2.475 16.413-.07.479c.162-1.08 1.043-1.876 2.089-1.876h4.352c8.548 0 15.241-3.637 17.197-14.158q.087-.466.152-.91a10 10 0 0 0-1.608-.712 15 15 0 0 0-.438-.144Z"
                          ></path>
                          <path
                            fill="#253B80"
                            d="M15.205 12.756a1.93 1.93 0 0 1 1.031-1.451c.245-.123.516-.19.802-.19h11.627c1.378 0 2.663.094 3.837.292a15 15 0 0 1 2.342.585q.867.3 1.609.711c.582-3.889-.005-6.536-2.012-8.934C32.228 1.13 28.235 0 23.125 0H8.29C7.247 0 6.356.795 6.195 1.877L.015 42.91c-.121.812.477 1.544 1.258 1.544h9.159l2.3-15.284z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="paypal-logo_svg__a">
                            <path fill="#fff" d="M0 0h195.456v50H0z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            {/* <div className="Remember_section">
              <h2 className="same_style_text">Remember me</h2>
            </div> */}
            <button
              aria-hidden="true"
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
              cart.cart.map((item, index) => {
                const price = prices[index];
                return (
                  <div key={index} className="summary-cont">
                    {!price ? (
                      //   <FinalpriceLoader2 />
                      <></>
                    ) : (
                      <>
                        <div className="summary-price"> &#8377; {price}</div>
                        <div className="summary-qty"> Qty: {item.qty}</div>
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
                          <div key={j}>
                            {Object.keys(op).map((key, index) => (
                              <div
                                key={index}
                                style={{ position: "relative" }}
                                className="cart_item_det"
                              >
                                {key === "Color" ? (
                                  <>
                                    <p className="cart-p" key={index}>
                                      {key}:
                                    </p>
                                    <div
                                      className="color-box-cart"
                                      style={{
                                        backgroundColor: op[key],
                                        width: "12px",
                                        height: "12px",
                                        position: "relative",
                                        borderRadius: "50%",
                                        top: "2px",
                                      }}
                                    ></div>
                                  </>
                                ) : (
                                  <p className="cart-p" key={index}>
                                    {key}: <span>{op[key]}</span>
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={`promo-cont t3 ${visible ? "min-promo" : null}`}>
            <div className="promo-t t3" onClick={() => setVisibile(!visible)}>
              <AiOutlineTag /> Enter a promo code
            </div>
            <input type="text" className="promo-input" />
            <div className="promo-btn primary-btn flex-all">Apply</div>
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
  );
};

export default Checkout2;
