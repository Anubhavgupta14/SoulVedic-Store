import React from "react";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import OutsideClickHandler from "react-outside-click-handler";
import { RxCross2 } from "react-icons/rx";
import { LiaCcVisa } from "react-icons/lia";
// import toast, { Toaster } from "react-hot-toast";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

const popupcard = ({
  open,
  Setopen,
  userData,
  setUserData,
  address,
  Setaddress,
  email,
}) => {
  const countries = [
    { value: "India (+91)", label: "India (+91)" },
    { value: "Afghanistan (+93)", label: "Afghanistan (+93)" },
    { value: "Albania (+355)", label: "Albania (+355)" },
    { value: "Algeria (+213)", label: "Algeria (+213)" },
    { value: "Andorra (+376)", label: "Andorra (+376)" },
    { value: "Angola (+244)", label: "Angola (+244)" },
    {
      value: "Antigua and Barbuda (+1-268)",
      label: "Antigua and Barbuda (+1-268)",
    },
    { value: "Argentina (+54)", label: "Argentina (+54)" },
    { value: "Armenia (+374)", label: "Armenia (+374)" },
    { value: "Australia (+61)", label: "Australia (+61)" },
    { value: "Austria (+43)", label: "Austria (+43)" },
    { value: "Azerbaijan (+994)", label: "Azerbaijan (+994)" },
    { value: "Bahamas (+1-242)", label: "Bahamas (+1-242)" },
    { value: "Bahrain (+973)", label: "Bahrain (+973)" },
    { value: "Bangladesh (+880)", label: "Bangladesh (+880)" },
    { value: "Barbados (+1-246)", label: "Barbados (+1-246)" },
    { value: "Belarus (+375)", label: "Belarus (+375)" },
    { value: "Belgium (+32)", label: "Belgium (+32)" },
    { value: "Belize (+501)", label: "Belize (+501)" },
    { value: "Benin (+229)", label: "Benin (+229)" },
    { value: "Bhutan (+975)", label: "Bhutan (+975)" },
    { value: "Bolivia (+591)", label: "Bolivia (+591)" },
    {
      value: "Bosnia and Herzegovina (+387)",
      label: "Bosnia and Herzegovina (+387)",
    },
    { value: "Botswana (+267)", label: "Botswana (+267)" },
    { value: "Brazil (+55)", label: "Brazil (+55)" },
    { value: "Brunei (+673)", label: "Brunei (+673)" },
    { value: "Bulgaria (+359)", label: "Bulgaria (+359)" },
    { value: "Burkina Faso (+226)", label: "Burkina Faso (+226)" },
    { value: "Burundi (+257)", label: "Burundi (+257)" },
    { value: "Cabo Verde (+238)", label: "Cabo Verde (+238)" },
    { value: "Cambodia (+855)", label: "Cambodia (+855)" },
    { value: "Cameroon (+237)", label: "Cameroon (+237)" },
    { value: "Canada (+1)", label: "Canada (+1)" },
    {
      value: "Central African Republic (+236)",
      label: "Central African Republic (+236)",
    },
    { value: "Chad (+235)", label: "Chad (+235)" },
    { value: "Chile (+56)", label: "Chile (+56)" },
    { value: "China (+86)", label: "China (+86)" },
    { value: "Colombia (+57)", label: "Colombia (+57)" },
    { value: "Comoros (+269)", label: "Comoros (+269)" },
    {
      value: "Congo (Congo-Brazzaville) (+242)",
      label: "Congo (Congo-Brazzaville) (+242)",
    },
    { value: "Costa Rica (+506)", label: "Costa Rica (+506)" },
    { value: "Côte d'Ivoire (+225)", label: "Côte d'Ivoire (+225)" },
    { value: "Croatia (+385)", label: "Croatia (+385)" },
    { value: "Cuba (+53)", label: "Cuba (+53)" },
    { value: "Cyprus (+357)", label: "Cyprus (+357)" },
    {
      value: "Czechia (Czech Republic) (+420)",
      label: "Czechia (Czech Republic) (+420)",
    },
    { value: "Denmark (+45)", label: "Denmark (+45)" },
    { value: "Djibouti (+253)", label: "Djibouti (+253)" },
    { value: "Dominica (+1-767)", label: "Dominica (+1-767)" },
    {
      value: "Dominican Republic (+1-809, +1-829, +1-849)",
      label: "Dominican Republic (+1-809, +1-829, +1-849)",
    },
    { value: "Ecuador (+593)", label: "Ecuador (+593)" },
    { value: "Egypt (+20)", label: "Egypt (+20)" },
    { value: "El Salvador (+503)", label: "El Salvador (+503)" },
    { value: "Equatorial Guinea (+240)", label: "Equatorial Guinea (+240)" },
    { value: "Eritrea (+291)", label: "Eritrea (+291)" },
    { value: "Estonia (+372)", label: "Estonia (+372)" },
    { value: "Eswatini (+268)", label: "Eswatini (+268)" },
    { value: "Ethiopia (+251)", label: "Ethiopia (+251)" },
    { value: "Fiji (+679)", label: "Fiji (+679)" },
    { value: "Finland (+358)", label: "Finland (+358)" },
    { value: "France (+33)", label: "France (+33)" },
    { value: "Gabon (+241)", label: "Gabon (+241)" },
    { value: "Gambia (+220)", label: "Gambia (+220)" },
    { value: "Georgia (+995)", label: "Georgia (+995)" },
    { value: "Germany (+49)", label: "Germany (+49)" },
    { value: "Ghana (+233)", label: "Ghana (+233)" },
    { value: "Greece (+30)", label: "Greece (+30)" },
    { value: "Grenada (+1-473)", label: "Grenada (+1-473)" },
    { value: "Guatemala (+502)", label: "Guatemala (+502)" },
    { value: "Guinea (+224)", label: "Guinea (+224)" },
    { value: "Guinea-Bissau (+245)", label: "Guinea-Bissau (+245)" },
    { value: "Guyana (+592)", label: "Guyana (+592)" },
    { value: "Haiti (+509)", label: "Haiti (+509)" },
    { value: "Honduras (+504)", label: "Honduras (+504)" },
    { value: "Hungary (+36)", label: "Hungary (+36)" },
    { value: "Iceland (+354)", label: "Iceland (+354)" },

    { value: "Indonesia (+62)", label: "Indonesia (+62)" },
    { value: "Iran (+98)", label: "Iran (+98)" },
    { value: "Iraq (+964)", label: "Iraq (+964)" },
    { value: "Ireland (+353)", label: "Ireland (+353)" },
    { value: "Israel (+972)", label: "Israel (+972)" },
    { value: "Italy (+39)", label: "Italy (+39)" },
    { value: "Jamaica (+1-876)", label: "Jamaica (+1-876)" },
    { value: "Japan (+81)", label: "Japan (+81)" },
    { value: "Jordan (+962)", label: "Jordan (+962)" },
    { value: "Kazakhstan (+7)", label: "Kazakhstan (+7)" },
    { value: "Kenya (+254)", label: "Kenya (+254)" },
    { value: "Kiribati (+686)", label: "Kiribati (+686)" },
    { value: "Kuwait (+965)", label: "Kuwait (+965)" },
    { value: "Kyrgyzstan (+996)", label: "Kyrgyzstan (+996)" },
    { value: "Laos (+856)", label: "Laos (+856)" },
    { value: "Latvia (+371)", label: "Latvia (+371)" },
    { value: "Lebanon (+961)", label: "Lebanon (+961)" },
    { value: "Lesotho (+266)", label: "Lesotho (+266)" },
    { value: "Liberia (+231)", label: "Liberia (+231)" },
    { value: "Libya (+218)", label: "Libya (+218)" },
    { value: "Liechtenstein (+423)", label: "Liechtenstein (+423)" },
    { value: "Lithuania (+370)", label: "Lithuania (+370)" },
    { value: "Luxembourg (+352)", label: "Luxembourg (+352)" },
    { value: "Madagascar (+261)", label: "Madagascar (+261)" },
    { value: "Malawi (+265)", label: "Malawi (+265)" },
    { value: "Malaysia (+60)", label: "Malaysia (+60)" },
    { value: "Maldives (+960)", label: "Maldives (+960)" },
    { value: "Mali (+223)", label: "Mali (+223)" },
    { value: "Malta (+356)", label: "Malta (+356)" },
    { value: "Marshall Islands (+692)", label: "Marshall Islands (+692)" },
    { value: "Mauritania (+222)", label: "Mauritania (+222)" },
    { value: "Mauritius (+230)", label: "Mauritius (+230)" },
    { value: "Mexico (+52)", label: "Mexico (+52)" },
    { value: "Micronesia (+691)", label: "Micronesia (+691)" },
    { value: "Moldova (+373)", label: "Moldova (+373)" },
    { value: "Monaco (+377)", label: "Monaco (+377)" },
    { value: "Mongolia (+976)", label: "Mongolia (+976)" },
    { value: "Montenegro (+382)", label: "Montenegro (+382)" },
    { value: "Morocco (+212)", label: "Morocco (+212)" },
    { value: "Mozambique (+258)", label: "Mozambique (+258)" },
    {
      value: "Myanmar (formerly Burma) (+95)",
      label: "Myanmar (formerly Burma) (+95)",
    },
    { value: "Namibia (+264)", label: "Namibia (+264)" },
    { value: "Nauru (+674)", label: "Nauru (+674)" },
    { value: "Nepal (+977)", label: "Nepal (+977)" },
    { value: "Netherlands (+31)", label: "Netherlands (+31)" },
    { value: "New Zealand (+64)", label: "New Zealand (+64)" },
    { value: "Nicaragua (+505)", label: "Nicaragua (+505)" },
    { value: "Niger (+227)", label: "Niger (+227)" },
    { value: "Nigeria (+234)", label: "Nigeria (+234)" },
    { value: "North Korea (+850)", label: "North Korea (+850)" },
    {
      value: "North Macedonia (formerly Macedonia) (+389)",
      label: "North Macedonia (formerly Macedonia) (+389)",
    },
    { value: "Norway (+47)", label: "Norway (+47)" },
    { value: "Oman (+968)", label: "Oman (+968)" },
    { value: "Pakistan (+92)", label: "Pakistan (+92)" },
    { value: "Palau (+680)", label: "Palau (+680)" },
    { value: "Palestine State (+970)", label: "Palestine State (+970)" },
    { value: "Panama (+507)", label: "Panama (+507)" },
    { value: "Papua New Guinea (+675)", label: "Papua New Guinea (+675)" },
    { value: "Paraguay (+595)", label: "Paraguay (+595)" },
    { value: "Peru (+51)", label: "Peru (+51)" },
    { value: "Philippines (+63)", label: "Philippines (+63)" },
    { value: "Poland (+48)", label: "Poland (+48)" },
    { value: "Portugal (+351)", label: "Portugal (+351)" },
    { value: "Qatar (+974)", label: "Qatar (+974)" },
    { value: "Romania (+40)", label: "Romania (+40)" },
    { value: "Russia (+7)", label: "Russia (+7)" },
    { value: "Rwanda", label: "Rwanda (+250)" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis (+1-869)" },
    { value: "Saint Lucia", label: "Saint Lucia (+1-758)" },
    {
      value: "Saint Vincent and the Grenadines",
      label: "Saint Vincent and the Grenadines (+1-784)",
    },
    { value: "Samoa", label: "Samoa (+685)" },
    { value: "San Marino", label: "San Marino (+378)" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe (+239)" },
    { value: "Saudi Arabia", label: "Saudi Arabia (+966)" },
    { value: "Senegal", label: "Senegal (+221)" },
    { value: "Serbia", label: "Serbia (+381)" },
    { value: "Seychelles", label: "Seychelles (+248)" },
    { value: "Sierra Leone", label: "Sierra Leone (+232)" },
    { value: "Singapore", label: "Singapore (+65)" },
    { value: "Slovakia", label: "Slovakia (+421)" },
    { value: "Slovenia", label: "Slovenia (+386)" },
    { value: "Solomon Islands", label: "Solomon Islands (+677)" },
    { value: "Somalia", label: "Somalia (+252)" },
    { value: "South Africa", label: "South Africa (+27)" },
    { value: "South Korea", label: "South Korea (+82)" },
    { value: "South Sudan", label: "South Sudan (+211)" },
    { value: "Spain", label: "Spain (+34)" },
    { value: "Sri Lanka", label: "Sri Lanka (+94)" },
    { value: "Sudan", label: "Sudan (+249)" },
    { value: "Suriname", label: "Suriname (+597)" },
    { value: "Sweden", label: "Sweden (+46)" },
    { value: "Switzerland", label: "Switzerland (+41)" },
    { value: "Syria", label: "Syria (+963)" },
    { value: "Tajikistan", label: "Tajikistan (+992)" },
    { value: "Tanzania", label: "Tanzania (+255)" },
    { value: "Thailand", label: "Thailand (+66)" },
    { value: "Timor-Leste", label: "Timor-Leste (+670)" },
    { value: "Togo", label: "Togo (+228)" },
    { value: "Tonga", label: "Tonga (+676)" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago (+1-868)" },
    { value: "Tunisia", label: "Tunisia (+216)" },
    { value: "Turkey", label: "Turkey (+90)" },
    { value: "Turkmenistan", label: "Turkmenistan (+993)" },
    { value: "Tuvalu", label: "Tuvalu (+688)" },
    { value: "Uganda", label: "Uganda (+256)" },
    { value: "Ukraine", label: "Ukraine (+380)" },
    { value: "United Arab Emirates", label: "United Arab Emirates (+971)" },
    { value: "United Kingdom", label: "United Kingdom (+44)" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Vatican City", label: "Vatican City" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" },
  ];

  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const addaddress = () => {
    if (!address) {
      Setaddress([userData]);
    } else {
      Setaddress([...address, userData]);
    }

    fetch(`https://backend.mamoshfashion.com/api/user/saveaddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: email, addressData: userData }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save address");
        }
        return response.json();
      })
      .then((data) => {
        // toast.success("Address saved successfully:", data);
      })
      .catch((error) => {
        // toast.error("Error saving address:", error);
      });

    Setopen(false);
  };
  return (
    <>
      {/* <Toaster /> */}
      <div className="variant-bg flex-all">
        <OutsideClickHandler
          onOutsideClick={() => {
            Setopen(false);
          }}
        >
          <div className="add-payment-main">
            <div className="wrap-payment-head">
              <div className="detail-top">
                <p>Address details</p>
                <div className="icons-pay">
                  <IoLocationOutline style={{ fontSize: "20px" }} />
                </div>
              </div>

              <div className="text-pay">
                Your Address Details will be saved securely
              </div>
            </div>
            <div className="card-details" style={{height:'51vh'}}>
              <div className="twoinone2">
                <div className="div-name card-info">
                  <label className="label-text text-sm font-bold">
                    First Name
                  </label>
                  <input
                    className="general__input"
                    type="text"
                    placeholder="Rohit"
                    name="firstname"
                    value={userData.firstname || ""}
                    onChange={handleData}
                  />
                </div>
                <div className="div-name card-info">
                  <label className="label-text text-sm font-bold">
                    Last Name
                  </label>
                  <input
                    className="general__input"
                    type="text"
                    placeholder="Sharma"
                    name="lastname"
                    value={userData.lastname || ""}
                    onChange={handleData}
                  />
                </div>
              </div>

              <div className="div-name card-info">
                <label className="label-text text-sm font-bold">
                  Address Line 1
                </label>
                <input
                  className="general__input"
                  type="text"
                  placeholder="Address"
                  name="addressline1"
                  value={userData.addressline1 || ""}
                  onChange={handleData}
                />
              </div>
              <div className="div-name card-info">
                <label className="label-text text-sm font-bold">
                  Address Line 2
                </label>
                <input
                  className="general__input"
                  type="text"
                  placeholder="Address"
                  name="addressline2"
                  value={userData.addressline2 || ""}
                  onChange={handleData}
                />
              </div>

              <div className="twoinone2">
                <div className="div-name card-info">
                  <label className="label-text text-sm font-bold">City</label>
                  <input
                    className="general__input"
                    type="text"
                    placeholder="City"
                    name="city"
                    value={userData.city || ""}
                    onChange={handleData}
                  />
                </div>
                <div className="div-name card-info">
                  <label className="label-text text-sm font-bold">
                    Postel Number
                  </label>
                  <input
                    className="general__input"
                    type="number"
                    placeholder="211027"
                    name="pincode"
                    value={userData.pincode || ""}
                    onChange={handleData}
                  />
                </div>
              </div>
              <div className="twoinone2">
                <div className="pro-country">
                  <label className="label-text text-sm font-bold">
                    Country
                  </label>
                  <div className="flex-all k">
                    <select
                      className="general__input"
                      name="country"
                      value={userData.country}
                      defaultValue="India (+91)"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          country: e.target.value,
                        })
                      }
                    >
                      {countries.map((country, index) => (
                        <option key={index} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="div-name card-info">
                  <div className="pro-country">
                    <label className="label-text text-sm font-bold">
                      State
                    </label>
                    <div className="flex-all k">
                      <select
                        className="general__input"
                        name="state"
                        value={userData.state}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            country: e.target.value,
                          })
                        }
                      >
                        {countries.map((country, index) => (
                          <option key={index} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="twoinone2">
                <div className="div-name card-info">
                  <label className="label-text text-sm font-bold">Phone</label>
                  <input
                    className="general__input"
                    type="number"
                    placeholder="Number"
                    name="phone"
                    value={userData.phone || ""}
                    onChange={handleData}
                  />
                </div>
                <div className="div-name card-info"></div>
              </div>
            </div>

            <div className="down-menu">
            <button
              className="_btn_wrapper _btn_height _w-full de-btn"
              style={{ width: "73px", marginTop: "0" }}
            >
              Cancel
            </button>
            <button
              className="_btn_wrapper3 _btn_height _w-full"
              onClick={() => {
                savecard(userData);
              }}
            >
              Save
            </button>
          </div>
          </div>
        </OutsideClickHandler>
      </div>
    </>
  );
};

export default popupcard;
