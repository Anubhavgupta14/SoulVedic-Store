import { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import Tab from "@/components/profile/Tab";
import { IoIosArrowRoundBack } from "react-icons/io";
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
      <div
        className="_btn_wrapper _btn_height _w-full back bg-white"
        onClick={() => {
          router.back();
        }}
      >
        <IoIosArrowRoundBack style={{ fontSize: "3rem" }} />
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
