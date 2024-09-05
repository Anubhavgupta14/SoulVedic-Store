import gsap from "gsap";
import React from "react";

const AnimBtn = ({ btnLoading }) => {
  // const timelineRef = useRef(null);
  // const [btnClick, setBtnClick] = useState(() => Btnclick());
  const Btnclick = () => {
    const AnimBtnCntr = document.querySelector(".ProductDets_ntfy_btn");
    const AnimLine_1 = document.querySelector(".ProductBtn_line1");
    const AnimLine_2 = document.querySelector(".ProductBtn_line2");

    const handleClick = () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelayed: 0 });
      //   tl.to(".ProductBtn_line_Anim", {
      //     opacity: 1,
      //     duration: 0.5,
      //     repeat: 0,
      //     ease: "power1.out",
      //   });

      // Animate the first line (AnimLine_2)
      tl.to(AnimLine_2, {
        width: "100%",
        duration: 0.5,
        ease: "power1.out",
      }).to(AnimLine_2, {
        width: 0,
        left: "100%",
        duration: 0.5,
        ease: "power1.out",
        delay: 0.3,
      });

      // Animate the second line (AnimLine_1) after the first one
      tl.to(AnimLine_1, {
        width: "100%",
        duration: 0.5,
        ease: "power1.out",
      }).to(AnimLine_1, {
        width: 0,
        left: "100%",
        duration: 0.5,
        ease: "power1.out",
        delay: 0.3,
      });

      // Animate the line animation container
      //   tl.to(".ProductBtn_line_Anim", {
      //     opacity: 0,
      //     duration: 0.1,
      //     ease: "power1.out",
      //   });
    };
    // setTimeout(() => {
    handleClick();
    // }, 2000);

    // AnimBtnCntr.addEventListener("click", handleClick);
  };
  Btnclick();
  return (
    <div
      className="btnAbsoulte"
      style={btnLoading ? { opacity: 1 } : { opacity: 0, zIndex: -1 }}
    >
      <div className="btn_wrapper _btn_height _w-full">
        <div className="ProductBtn_line_Anim ProductDets_ntfy_btn ProductDets_ntfy_btn_grid">
          <div className="ProductBtn_line_cntr">
            <div className="ProductBtn_line ProductBtn_line1"></div>
            <div className="ProductBtn_line ProductBtn_line2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimBtn;
