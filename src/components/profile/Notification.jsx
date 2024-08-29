// import ProfileLayout from "../../components/user_data/user_notification";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const General = () => {

  return (
    <div className="noti-main-div">
      <div
        className="pay-top"
      >
        <div className="pay-head">
          <h4>Email Preferences</h4>
          <p>
          Manage your email preferences for a personalized experience tailored to your preferences. Your data security is our utmost priority.{" "}
            <span style={{ color: "#3b82f6", cursor: "pointer" }}>
              Learn More.
            </span>{" "}
          </p>
          <p>
          
          </p>
        </div>
        
      </div>

      <div
        className="security-div"
      >
        <div className="security-main" style={{ height: "385px" }}>
          {/* <p>Subscription Preference Center</p> */}
          {/* <div className="myline-4"></div> */}

          <div className="form-secure">
            <p className="would">
              I would like to receive notifications for :
            </p>
            <div className="notisel">
              <div className="rownoti">
                <input type="checkbox" className="noticheck"></input>
                <p className="noti-p">Product Announcements and Updates</p>
              </div>
              <div className="rownoti">
                <input type="checkbox" className="noticheck"></input>
                <p className="noti-p">Events and Meetups</p>
              </div>
              <div className="rownoti">
                <input type="checkbox" className="noticheck"></input>
                <p className="noti-p"> User Research Surveys</p>
              </div>
              <div className="rownoti">
                <input type="checkbox" className="noticheck"></input>
                <p className="noti-p">Hatch Startup Program</p>
              </div>
            </div>
            
            <div className="rownoti" style={{marginTop:'25px', alignItems:'baseline'}}>
              <input type="checkbox" className="noticheck"></input>
              <p className="noti-p" style={{fontWeight:'600'}}>To unsubscribe from all email communications, click below. We respect your choice and apologize for any inconvenience. You can resubscribe at any time. Thank you.</p>
            </div>
            <div className="fixed-right" style={{marginTop:'15px'}}>
        <div className="fr-save" style={{ width: "14vw", marginTop: "12px" }}>
          Update My Preferences
        </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
