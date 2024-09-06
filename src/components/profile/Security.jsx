// import ProfileLayout from "../../components/user_data/User_security";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
// import toast, { Toaster } from "react-hot-toast";
import {Changepassword} from "../../../api_fetch/admin/User"

const General = ({email}) => {

  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  // let productsjson = useLoaderData();


  const [userData, setUserData] = useState({
    currentpass: "",
    newpass: "",
    renewpass: "",
  });

  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangePassword = async () => {
    try {
      setLoad(true);
      // const response = await fetch(
      //   `https://backend.mamoshfashion.com/api/user/changepassword`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ email, ...userData }),
      //   }
      // );

      const data = await Changepassword({ email, ...userData })

      if (data) {
        toast.success("Password changed successfully");
        setUserData({ currentpass: "", newpass: "", renewpass: "" });
      } else {
        // toast.error(data.message || "Failed to change password");
      }
      setLoad(false);
    } catch (error) {
      console.error("Error changing password:", error.message);
    //   toast.error("Failed to change password");
    }
  };

  return (
    <>
      {/* <Toaster /> */}

      <div className="noti-main-div">
        <div className="security-left">
          <h4>Change Password</h4>
          <div className="passguide">
            <p>New password must contain:</p>
            <p>- At least 8 characters</p>
            <p>- At least 1 lower letter (a-z)</p>
            <p>- At least 1 uppercase letter (A-Z)</p>
            <p>- At least 1 number (0-9)</p>
            <p>- At least 1 special characters</p>
          </div>
        </div>
        {/* <div className="myline-4"></div> */}

        <div className="form-secure" style={{ width: "50%" }}>
          <div className="curr-pass" style={{position:'relative'}}>
            <div className="eye-cont flex-all" style={{top:'-13px'}} onClick={()=>{setVisible(!visible)}}>{visible ? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}</div>
            <input
              className="general__input"
              type={visible ? "text":"password"}
              placeholder="Enter Current Password"
              name="currentpass"
              value={userData.currentpass || ""}
              onChange={handleData}
            />
            
          </div>
          <div className="curr-pass" style={{position:'relative'}}>
          <div className="eye-cont flex-all" style={{top:'-13px'}} onClick={()=>{setVisible2(!visible2)}}>{visible2 ? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}</div>
              {/* <label className="passguide">New Password</label> */}
              <input
                className="general__input"
                type={visible2 ? "text":"password"}
                placeholder="Enter New Password"
                name="newpass"
                value={userData.newpass || ""}
                onChange={handleData}
              />
            </div>
            <div className="curr-pass" style={{position:'relative'}}>
            <div className="eye-cont flex-all" style={{top:'-13px'}} onClick={()=>{setVisible3(!visible3)}}>{visible3 ? <AiOutlineEye/>:<AiOutlineEyeInvisible/>}</div>
              {/* <label className="passguide">Re-enter New Password</label> */}
              <input
                className="general__input"
                type={visible3 ? "text":"password"}
                placeholder="Enter Confirm Password"
                name="renewpass"
                value={userData.renewpass || ""}
                onChange={handleData}
              />
            </div>
          <div className="secure-btn">
            <div class="_btn_wrapper3 _btn_height _w-full" style={{width:'170px'}} onClick={handleChangePassword}>
              {load ? <div className="login-load"></div> : "Change Password"}
            </div>
          </div>
        </div>
      </div>



      <div className="noti-main-div">
        <div className="security-left">
        <h4>Delete Account</h4>
          </div>
        
        <div className="delete-info passguide">
          <p>To deactivate your account, first delete its resources. If you are the
          only owner of any teams, either assign another owner or deactivate the
          team.</p>
          <div className="_btn_wrapper _btn_height _w-full de-btn">Deactivate Account</div>
        </div>
      </div>
    </>
  );
};

export default General;
