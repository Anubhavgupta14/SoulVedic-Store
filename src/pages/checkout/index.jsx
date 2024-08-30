import React, { useState, useEffect } from "react";
import { AiOutlineTag } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {Const} from "../../../utils/Constants"
import { MdOutlineErrorOutline } from "react-icons/md";
import { useRouter } from 'next/router';
import {Checkoutitem,Saveorders, CheckAddress,Getcart} from "../../../api_fetch/admin/Checkout"
import {FinalPrice} from "../../../api_fetch/admin/Cart"

const Checkout = () => {

  const router = useRouter();
  const cartdata = useSelector((state) => state.cart);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false)
  const [userid, Setuserid] = useState("")
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
  const saveorder = async()=>{
    try{
        const newOrderId = generateOrderId();
        setOrderId(newOrderId);
        let order = cartdata.cart.map(item => ({
            ...item,
            orderNo: newOrderId
          }));
        const responseData = await Saveorders({ userId: userid, orders: order})

        // const responseData = await response.json();
    //   console.log(responseData) 
    }
    catch(err){
      console.log(err)
    }
  }
  const saveordernologin = async()=>{
    try{

      const responseData = await Saveorders({ userId:inputs[0].input, orders: cartdata.cart})
      // const responseData = await response.json();
      console.log(responseData) 
    }
    catch(err){
      console.log(err)
    }
  }
  const handleGenerateOrderId = async() => {
    
    localStorage.removeItem("persist:root");
    const token = localStorage.getItem('token');
    if(token){
    try{

    const responseData = await Checkoutitem(token)

      // const responseData = await response.json();
    //   console.log(responseData)
    }
    catch(err){
      console.log(err)
    }
    await saveorder();
    router.push(`/paymentstatus?id=${orderId}&amount=${total}`);
  }
  else{
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
  const handleSubmit = (event) => {
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

      Setaddressdata(requestData)

      // Make a POST request to the API
      fetch(`${Const.Link}api/user/saveaddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userid, addressData: requestData }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save address");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Address saved successfully:", data);
          setIsUpdated((prev)=>!prev)
        })
        .catch((error) => {
          console.error("Error saving address:", error);
        });
    } else {
      // There are errors, do not set addresssaved to true
      Setaddresssaved(false);
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
        body: JSON.stringify({ userId: inputs[0].input, addressData: requestData }),
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
         const data = await Getcart(token)
         if (data) {
          //  const data = await response.json();
           Setuserid(data.userId);
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

    const data = await CheckAddress(token)
    if(data.error){
      setNewadd(true)
      return;
    }
    if (data) {
      Setaddressdata(data);
    } else {
      setNewadd(true);
    }
  };

  useEffect(()=>{
    setTimeout(() => {
      fetchaddress()
    }, 500);
  },[isUpdated])


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
            })
            if(data.err){
                return 100
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

  return (
    <div className="checkout-cont">
      <div className="checkout-left">
        <div className="log-check flex-all">
          {!user ? (
            <>
              Already have an account?{" "}
              <a style={{cursor:'pointer'}} onClick={()=>{router.push("/login")}}>
                <div className="checkout-in">Log in </div>
              </a>
              for a faster checkout.
            </>
          ) : (
            `Logged in as ${cart && userid}`
          )}
        </div>
        {!user ? (
          // No user
          <>
            <div className="address">
              {!addresssaved ? (
                <div>
                  <div>
                    <p className="address-p">Customer Details</p>
                    {inputs.map((el, i) => (
                      <div key={i} className="div-input">
                        <p className="address-input-p">{el.title}</p>
                        <input
                          className="address-input"
                          value={el.input}
                          type={el.type}
                          onChange={(e) => handleInputChange(i, e.target.value)}
                          required
                        ></input>
                        {el.errorVisible && (
                          <p className="error-checkout">
                            <MdOutlineErrorOutline className="error-sym" />
                            {el.error}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="address-p">Delivery Details</p>
                    {inputs.map(
                      (el, i) =>
                        i !== 0 &&
                        user && (
                          <div key={i} className="div-input">
                            <p className="address-input-p">{el.title}</p>
                            <input
                              className="address-input"
                              value={el.input}
                              type={el.type}
                              onChange={(e) =>
                                handleInputChange(i, e.target.value)
                              }
                              required
                            ></input>
                            {el.errorVisible && (
                              <p className="error-checkout">
                                <MdOutlineErrorOutline className="error-sym" />
                                {el.error}
                              </p>
                            )}
                          </div>
                        )
                    )}

                    {Delivery.map((el, i) => (
                      <div key={i} className="div-input">
                        <p className="address-input-p">{el.title}</p>
                        {i !== 0 ? (
                          <input
                            className="address-input"
                            value={el.input}
                            type={el.type}
                            onChange={(e) =>
                              handleInputChange2(i, e.target.value)
                            }
                            required
                          ></input>
                        ) : (
                          <select
                            className="address-input"
                            value={el.input}
                            onChange={(e) =>
                              handleInputChange2(i, e.target.value)
                            }
                          >
                            <option value="India">India</option>
                          </select>
                        )}
                        {el.errorVisible && (
                          <p className="error-checkout">
                            <MdOutlineErrorOutline className="error-sym" />
                            {el.error}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    className="fr-save"
                    type="submit"
                    onClick={handleSubmitnologin}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                //saved address (no login)
                <div>
                  <div className="add-h">
                    <p className="address-p">Customer & delivery details</p>
                    <p
                      className="edit-add"
                      onClick={() => {
                        Setaddresssaved(false);
                      }}
                    >
                      Edit Address
                    </p>
                  </div>
                  <p className="add-p">
                    {inputs[1].input} {inputs[2].input}
                  </p>
                  <p className="add-p">
                    {inputs[4].title} : {inputs[4].input}
                  </p>
                  <p className="add-p">{inputs[0].input}</p>
                  <p className="add-p">{Delivery[1].input}</p>
                  <p className="add-p">Phone no: {inputs[3].input}</p>
                  <p className="add-p">
                    {Delivery[2].input}, {Delivery[0].input}
                  </p>
                  <p className="add-p">Pincode: {Delivery[4].input}</p>
                </div>
              )}
            </div>

            <div className="my-2"></div>

            <div className="payment-check">
              <p className="address-p">Payment</p>
              <div className="billing">
                <p>Billing address</p>
                <div className="sameadd">
                  <input type="checkbox"></input>
                  <p>Same as delivery address</p>
                </div>
              </div>
              <div className="my-2"></div>

              <div className="billing">
                <p>Review & place order</p>
                <div className="sameadd">
                  <p>
                    Review the order details above, and place your order when
                    you're ready.
                  </p>
                </div>
                <div className="sameadd">
                  <input type="checkbox"></input>
                  <p>
                    I agree to receive marketing communications via email and /
                    or SMS to any emails and phone numbers added above.
                  </p>
                </div>
              </div>
              <button className="fr-save placeorder" onClick={handleGenerateOrderId}>
                Place Order & Pay
              </button>
            </div>
          </>
        ) : (
          //User Logged
          <>
            <div className="address">
              {!addresssaved ? (
                <>
                  <div>
                    {/* Data from backend */}
                    {addressdata && temp ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems:'center'
                          }}
                        >
                          <p className="address-p">
                            Delivery & Contact Details
                          </p>
                          {!open && (
                            <p
                              className="edit-add"
                              onClick={() => {
                                Setopen(true);
                              }}
                            >
                              Change
                            </p>
                          )}
                        </div>

                        {!open && (
                          <>
                            <div className="add-box">
                              <p className="add-p">
                                {addressdata[index].firstname}{" "}
                                {addressdata[index].lastname}
                              </p>
                              <p className="add-p">{cart.userId}</p>
                              <p className="add-p">
                                Flat or house no: {addressdata[index].flat}
                              </p>
                              <p className="add-p">
                                {addressdata[index].address}{" "}
                                {addressdata[index].city}{" "}
                                {addressdata[index].country}
                              </p>
                              <p className="add-p">
                                {addressdata[index].phone}
                              </p>
                              <p className="add-p">
                                {addressdata[index].pincode}
                              </p>
                            </div>
                          </>
                        )}
                        {/* DropDown */}
                        {open && (
                          <div className="selectadd">
                            <div className="selbtn">
                            <select
                              className="add-sel"
                              onChange={(event) => {
                                Setindex(event.target.selectedIndex);
                              }}
                            >
                              {addressdata.map((el, i) => (
                                <option className="add-sel" key={i}>
                                  {el.firstname} {el.lastname} {el.address}
                                </option>
                              ))}
                            </select>
                            <button
                              className="fr-cancel sel" style={{backgroundColor:'white'}}
                              onClick={() => {
                                Setopen(false);
                              }}
                            >
                              Select
                            </button>
                            </div>
                            <button onClick={tempfunc} className="fr-save">
                              Add New
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {/* Form */}
                        {newadd && (
                          <div>
                            <p className="address-p">Delivery Details</p>
                            {inputs.map(
                              (el, i) =>
                                i !== 0 && (
                                  <div key={i} className="div-input">
                                    <p className="address-input-p">
                                      {el.title}
                                    </p>
                                    <input
                                      className="address-input"
                                      value={el.input}
                                      type={el.type}
                                      onChange={(e) =>
                                        handleInputChange(i, e.target.value)
                                      }
                                      required
                                    ></input>
                                    {el.errorVisible && (
                                      <p className="error-checkout">
                                        <MdOutlineErrorOutline className="error-sym" />
                                        {el.error}
                                      </p>
                                    )}
                                  </div>
                                )
                            )}

                            {Delivery.map((el, i) => (
                              <div key={i} className="div-input">
                                <p className="address-input-p">{el.title}</p>
                                {i !== 0 ? (
                                  <input
                                    className="address-input"
                                    value={el.input}
                                    type={el.type}
                                    onChange={(e) =>
                                      handleInputChange2(i, e.target.value)
                                    }
                                    required
                                  ></input>
                                ) : (
                                  <select
                                    className="address-input"
                                    value={el.input}
                                    onChange={(e) =>
                                      handleInputChange2(i, e.target.value)
                                    }
                                  >
                                    <option value="India">India</option>
                                  </select>
                                )}
                                {el.errorVisible && (
                                  <p className="error-checkout">
                                    <MdOutlineErrorOutline className="error-sym" />
                                    {el.error}
                                  </p>
                                )}
                              </div>
                            ))}
                            <button
                              type="submit"
                              className="fr-save"
                              style={{marginBottom:'20px'}}
                              onClick={handleSubmit}
                            >
                              Submit
                            </button>
                          </div>
                        )}
                        {!newadd && <></>}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  {/* Details after filling form */}
                  <div className="add-h">
                    <p className="address-p">Delivery & Contact Details</p>
                    {!open2 && (
                      <p
                        className="edit-add"
                        onClick={() => {
                          Setopen2(true);
                        }}
                      >
                        Change
                      </p>
                    )}
                  </div>
                  {!open2 && (
                    <div>
                      <p className="add-p">
                        {inputs[1].input} {inputs[2].input}
                      </p>
                      <p className="add-p">{cart.userId}</p>
                      <p className="add-p">
                        {inputs[4].title} : {inputs[4].input}
                      </p>
                      <p className="add-p">{inputs[0].input}</p>
                      <p className="add-p">{Delivery[1].input}</p>
                      <p className="add-p">{inputs[3].input}</p>
                      <p className="add-p">
                        {Delivery[2].input}, {Delivery[0].input}
                      </p>
                      <p className="add-p">{Delivery[4].input}</p>
                    </div>
                  )}

                  {open2 && (
                    <div className="selectadd">
                    <div className="selbtn">
                    <select
                      className="add-sel"
                      onChange={(event) => {
                        Setindex(event.target.selectedIndex);
                      }}
                    >
                      {addressdata && addressdata.map((el, i) => (
                        <option className="add-sel" key={i}>
                          {el.firstname} {el.lastname} {el.address}
                        </option>
                      ))}
                    </select>
                    <button
                      className="fr-cancel sel" style={{backgroundColor:'white'}}
                      onClick={() => {
                        Setopen2(false);
                      }}
                    >
                      Select
                    </button>
                    </div>
                    <button onClick={()=>{tempfunc()}} className="fr-save">
                      Add New
                    </button>
                  </div>
                  )}
                </div>
              )}
            </div>

            <div className="my-2"></div>

            <div className="payment-check">
              <p className="address-p">Payment</p>
              <div className="billing">
                <p>Billing address</p>
                <div className="sameadd">
                  <input type="checkbox"></input>
                  <p>Same as delivery address</p>
                </div>
              </div>
              <div className="my-2"></div>

              <div className="billing">
                <p>Review & place order</p>
                <div className="sameadd">
                  <p>
                    Review the order details above, and place your order when
                    you're ready.
                  </p>
                </div>
                <div className="sameadd">
                  <input type="checkbox"></input>
                  <p>
                    I agree to receive marketing communications via email and /
                    or SMS to any emails and phone numbers added above.
                  </p>
                </div>
              </div>
              <button className="fr-save placeorder" style={{width:'150px'}} onClick={handleGenerateOrderId}>
                Place Order & Pay
              </button>
            </div>
          </>
        )}
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
                      <img alt="" src={item.img} style={{maxHeight:'100%'}} />
                    </div>
                    <div className="summary-details">
                      <div className="summary-name">{item.name}</div>
                      {cart &&
                        item.variants.map((op, j) => (
                          <div key={j}>
                            {Object.keys(op).map((key, index) => (
                                        <div key={index} style={{position:'relative'}} className="cart_item_det">
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
                                                position:'relative',
                                                borderRadius:'50%',
                                                top:'2px'
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

export default Checkout;
