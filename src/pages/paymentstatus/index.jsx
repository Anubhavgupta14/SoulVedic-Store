import React, { useState, useEffect,useRef } from 'react'
import { TiTick } from 'react-icons/ti';
import { useRouter } from 'next/router';

const DonationSuccess = () => {
    const router = useRouter();
    const [time, setTime] = useState(10);
    const [orderid, Setorderid] = useState("");
    const [amount, Setamount] = useState(0);


     useEffect(() => {
         let a = 10;
         setInterval(() => {
             if (a >= 0) {
                 setTime(a);
                 a--;
             }
         }, 1000);
         setTimeout(() => {
            window.location.href = '/';
         }, 10000);
     }, [])
     
    useEffect(() => {
      // Function to fetch data based on the query string
      const fetchData = async () => {
        try {
          // Get the query parameters from the router
          const { query: { id, amount } } = router;
  
          // Decode the amount parameter
          const decodedAmount = decodeURIComponent(amount);  
          // Set the orderId and amount state
          Setorderid(id);
          Setamount(decodedAmount);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      // Call the fetchData function when the component mounts or when the query string changes
      fetchData();
    }, [router.query]);

    

    return (
        <div className='thank-cont'>
            <div className="tlc t-logo-check">
            <img src={"/check.gif"} fill  loading='lazy' loop='false'/>
            </div>

            <div className="trc">
                <div className="t-text">
                    <h1>Thanks for purchasing</h1>
                    <p>Your order of <span>₹{amount}</span> has been successfully processed.</p>
                    <p>Your order id is {orderid} <span></span></p>
                    <p>You will be redirected to the home page in {time} <span></span> seconds</p>
                    <a href="/">
                        <p className="donation-success__btn">Go to home page</p></a>
                </div>
                </div>
                
        </div>
    )
}

export default DonationSuccess