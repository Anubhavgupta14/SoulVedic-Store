import { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import Tab from "@/components/profile/Tab";

const General = () => {
  const [section, setSection] = useState(0);

  const handleTabChange = (newValue) => {
    setSection(newValue);
  };

  return (
    <>
      <div className="parent-div">
        <div className="outerdiv-pro">
          <Tab />
        </div>
      </div>
    </>
  );
};

export default General;
