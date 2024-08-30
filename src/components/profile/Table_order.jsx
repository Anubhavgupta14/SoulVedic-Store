import React, { useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import {Const} from "../../../utils/Constants"
import { MdOutlineOpenInNew } from "react-icons/md";
import style from "../../styles/table.module.css";
// import { useNavigate } from "react-router-dom";

const Table = ({ columns, rows, editItem,setDeleteProduct }) => {
  // const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);
  const [prices, setPrices] = useState([]);
  const [open, setOpen] = useState({ right: false });
  const [statusValue, setStatusValue] = useState(0);
  const [value, setValue] = useState([20, 37]);

  const toggleDrawer = (anchor, newOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen({ ...open, [anchor]: newOpen });
  };

  const handleSelectChange = ({ target: { name, value } }) => {
    setStatusValue(value);
  };

  const valuetext = (value) => {
    return `₹ ${value}`;
  }
  const handlePopupModel = () => {
    setOpenModel(false);
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const status = [
    { id: 0, name: "Inactive" },
    { id: 1, name: "Active" },
  ];
  const [finalprice, Setfinalprice] = useState(0);

  useEffect(() => {
    const fetchPrices = async () => {
      const updatedPrices = await Promise.all(
        rows.map(async (el) => {
          // Start from index 1
          try {
            const response = await fetch(
              `${Const.Link}api/products/getFinalPrice`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productid: el.productid,
                  variants: el.variants[0], // assuming variants is an array and you want to send the first variant
                }),
              }
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error fetching price:", error);
            return null;
          }
        })
      );
      setPrices(updatedPrices);
      console.log("kokok", updatedPrices);
      
    };
    {
      rows && fetchPrices();
    }
  }, [rows]);


  return (
    <>
      <div className={style.tableCard}>
        
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.checktr}>
                <input type="checkbox" className={style.formCheckbox} />
              </th>
              {columns?.map((items) => {
                return (
                  <>
                    <th>
                      <span role="button">
                        {items} <FaSort className={style.sortIcon} />
                      </span>
                    </th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((items, i) => {
              return (
                <tr>
                  <td className={style.checktr}>
                    <input type="checkbox" className={style.formCheckbox} />
                  </td>
                  <td>
                    <div>
                        <p className="orderid1">{items.orderNo}</p>
                        {/* <p className="orderid2">1093094995 <MdOutlineOpenInNew /></p> */}
                    </div>
                  </td>
                  <td>
                    <div className={style.featureBox}>
                      <div className={style.tableImg}>
                        <img src={items.img} fill alt={items.name} />
                      </div>
                      <div className={style.tableContent}>
                        <label className={style.tableTitle}>{items.name}</label>
                        <span className={style.tableCollections}>
                          {`Qty :${items.qty}`}
                        </span>
                        {items.variants[0].length && 
                        <span className={style.tableCollections}>
                          {`Variants :${items.variants}`}
                        </span>
                        }
                      </div>
                    </div>
                  </td>
                  <td>15-04-2024</td>
                  <td>
                    20-04-2024
                  </td>
                  <td>{prices[i]}</td>
                  <td >
                    <span className={`${items.status == true?style.activeStatus:style.inactiveStatus}`}>
                    {items && items.status === false ? "Pending" : "Delivered"}
                    </span>
                    {/* Delivered */}
                    {/* <select className={style.fieldsSelect} name="status" value={statusValue} onChange={handleSelectChange}>
                        {status.map((items) => {
                            return (
                                <>
                                    <option value={items.id}>{items.name}</option>
                                </>
                            );
                        })}
                    </select> */}
                  </td>
                  <td>
                    {/* <div className={style.actions}>
                      <button className={style.items}>
                        <FiEye />
                      </button>
                      <button
                        className={style.items}
                        onClick={() => editItem(items._id)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className={style.items}
                        onClick={() => setDeleteProduct(items)}>
                        <FiTrash2 />
                      </button>
                    </div> */}
                    Track
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
