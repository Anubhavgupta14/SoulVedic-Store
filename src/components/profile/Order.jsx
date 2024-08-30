import { useState, useEffect } from "react";
import Table from "./Table_order"
import {Getorders} from "../../../api_fetch/admin/User"
const General = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    dob: "",
    gender: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    dob: "",
    gender: "",
    country: "",
  });

  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  let validate = () => {
    let formErrors = {};
    let regex = userData.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!userData.name) {
      formErrors.name = "Full Name is Required";
    }

    if (!userData.email) {
      formErrors.email = "Email is Required";
    } else if (!regex) {
      formErrors.email = "This is not a valid email format";
    }
    if (!userData.phone) {
      formErrors.phone = "Phone is Required";
    }
    if (!userData.gender) {
      formErrors.gender = "Gender is Required";
    }
    if (!userData.dob) {
      formErrors.dob = "Date of Birth is Required";
    }
    if (!userData.country) {
      formErrors.country = "Country is Required";
    }

    return formErrors;
  };

  const [products, setProducts] = useState(null);
  useEffect(() => {
    const func = async () => {
      try {
        const token = localStorage.getItem('token')
      //   const response = await fetch(`https://backend.mamoshfashion.com/api/orders/getorders`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ token}),
      // });

      const data = await Getorders(token)

        if (!data) {
          throw new Error("Failed to fetch data");
        }

        // const data = await response.json();
        setProducts(data);
        console.log(data, "productjson");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    func();
  }, []);

  const editItem = (id) => {
    router.push(`/admin/edit-product/?id=${id}`);
  };
  const columns = [
    "Order Id",
    "Product",
    "Order Date",
    "Delivery Date",
    "Price",
    "Status",
    "Track Order",
  ];
  const [deleteIndex, setDeleteIndex] = useState(null);
    const [deleteProduct,setDeleteProduct] = useState(null);

  return (
    <div>
      <div className="pay-top" style={{ marginInline: "-2vw" }}>
        <div className="pay-head">
          <h4>Order History</h4>
          <p>
            Access your order history effortlessly to track past purchases and
            manage returns
          </p>
          <p>
            Your information remains secure with us.{" "}
            <span style={{ color: "#3b82f6", cursor: "pointer" }}>
              Learn more.
            </span>
          </p>
        </div>

        {/* <div className="fixed-right">
          <div className="fr-save w-13vw">Add a Payment Method</div>
        </div> */}
      </div>
      <div
        className="order-div"
        style={{ marginInline: "-2vw", marginTop: "30px" }}
      >
        <div className="my-2 line-order"></div>
        {products && (
          <Table
            columns={columns}
            rows={products}
            editItem={editItem}
            setDeleteProduct={setDeleteProduct}
          />
        )}
        
      </div>
    </div>
  );
};

export default General;
