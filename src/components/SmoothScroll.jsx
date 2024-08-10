import gsap from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollSmoother);
const Smoothscroll = () => {
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {};
  }, []);

  return null;
};

export default Smoothscroll;
