import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
// import toast, { Toaster } from "react-hot-toast";
import {useDispatch} from 'react-redux'
import {setUserTrue} from "../../features/user/UserSlice"
import { useRouter } from 'next/router';
import {Const} from "../../../utils/Constants"


const Signup = ({ setLogin }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    email: "",
    password: "",
  });
  const [visible, setVisisible] = useState(false);

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const signupvalidate = () => {
    // console.log(user,"us");
    let formErrors = {};
    let regex = user.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    if (!user.firstname) {
      formErrors.firstname = "Field is Required";
    }

    if (!user.lastname) {
      formErrors.lastname = "Field is Required";
    }
    if (!user.phoneno) {
      formErrors.phoneno = "Field is Required";
    }
    if (!user.email) {
      formErrors.email = "Email is Required";
    } else if (!regex) {
      formErrors.email = "This is not a valid email format";
    }
    if (!user.password) {
      formErrors.password = "Password is Required";
    } else if (!user.password.match(upperCaseLetters)) {
      formErrors.password = "Password must contain upper case letters";
    } else if (!user.password.match(numbers)) {
      formErrors.password = "Password must contain numbers";
    }
    if (Object.keys(formErrors).length === 0) {
      setError({});
      return true;
    }
    setError(formErrors);
    return false;
  };
  console.log(user,"user")
  const signUp = async () => {
    if (signupvalidate()) {
      setLoad(true);
      try {
        const userToSend = { ...user };
        if (userToSend.phoneno.length < 10) {
          setLoad(false)
          setError({phoneno:"This is not a valid phone no."})
          return;
        }
        console.log(userToSend,"to send")
        const response = await fetch(
          `${Const.Link}api/user/signup`,
          {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify(userToSend),
          }
        );

        const data = await response.json();
        if(data){
          localStorage.setItem('token',data.token)
          dispatch(setUserTrue());
        }
        if (response.ok) {
          setError("");
        } else {
        }

        setUser({
          firstname: "",
          lastname: "",
          phoneno: "",
          email: "",
          password: "",
        });
        setError({
          firstname: "",
          lastname: "",
          phoneno: "",
          email: "",
          password: "",
        });

        setLoad(false);
        router.push("/")
      } catch (error) {
        console.error("Oops,", error);
      }
    } else {
      console.log("nhi hua");
    }
  };

  return (
    <>
      {" "}
      <div className="left-two">
        <div className="login-inner">
          <div className="login-t">Sign Up</div>

          <div className="name-cont">
            <div className="inp-rel half-inp-cont">
              <input
                className="half-inp"
                value={user.firstname}
                name="firstname"
                onChange={handleChange}
                placeholder="First Name"
              />
              {error.firstname && (
                <div className="error-p">{error.firstname}</div>
              )}
            </div>
            <div className="inp-rel half-inp-cont">
              <input
                className="half-inp"
                value={user.lastname}
                name="lastname"
                onChange={handleChange}
                placeholder="Last Name"
              />
              {error.lastname && (
                <div className="error-p">{error.lastname}</div>
              )}
            </div>
          </div>
          <div className="phone-div inp-rel">
            {error.phoneno && (
              <div className="error-p phone-error">{error.phoneno}</div>
            )}
            <label id="number-label" htmlFor="number">
              Phone Number :
            </label>
            <PhoneInput
              defaultCountry="in"
              value={phone}
              className="phone-con signup-inp"
              inputClassName="general__input__phone signup-inp"
              onChange={(phoneno) => {
                setUser({ ...user, phoneno: phoneno });
              }}
            />
          </div>

          <div className="inp-rel">
            <input
              className="login-inp"
              value={user.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
            {error.email && <div className="error-p">{error.email}</div>}
          </div>
          <div className="pass-cont inp-rel">
            <div
              className="eye-cont flex-all"
              onClick={() => {
                setVisisible(!visible);
              }}
            >
              {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
            <input
              className="login-inp"
              type={visible ? "text" : "password"}
              value={user.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
            {error.password && <div className="error-p">{error.password}</div>}
          </div>

          <div className="login-btn flex-all" onClick={signUp}>
            {load ? <div className="login-load"></div> : "Signup"}
          </div>

          <div className="not-up">
            Already a member?{" "}
            <span
              onClick={() => {
                setLogin(true);
              }}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
