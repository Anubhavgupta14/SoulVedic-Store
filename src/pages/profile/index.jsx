import { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import Tab from "@/components/profile/Tab";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const General = () => {
  const [section, setSection] = useState(0);
  const router = useRouter();
  const handleTabChange = (newValue) => {
    setSection(newValue);
  };

  return (
    <>

      <div className="parent-div">
      <div className="back" onClick={()=>{router.back()}} style={{}}>
        <FaRegArrowAltCircleLeft/>
        <p>Back</p>
      </div>
        <div className="outerdiv-pro">
          <Tab />
        </div>
      </div>
    </>
  );
};

export default General;
