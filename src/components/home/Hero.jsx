import gsap from "gsap";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Vertical_wrapper",
        start: "top top",
        end: "+=200%",
        pin: true,
        // markers: true,
        scrub: 1,
      },
    });
    tl.to(
      ".Vertical_wrapper_video_sec-1",
      {
        clipPath: `inset(0 0 100% 0)`,
      },
      "a"
    )
      .to(
        ".Vertical_wrapper_video_sec-2",
        {
          clipPath: `inset(0% 0 0 0)`,
          // scale: 1.2,
        },
        "a-=0.2"
      )
      .to(
        ".Vertical_wrapper_video_sec-2",
        {
          clipPath: `inset(0 0 100% 0)`,
        },
        "b"
      )
      .to(
        ".Vertical_wrapper_video_sec-3",
        {
          clipPath: `inset(0% 0 0 0)`,
        },
        "b-=0.1"
      );
  });

  return (
    <>
      <div className="Vertical_wrapper">
        <div className="Vertical_wrapper_video_first_sec Vertical_wrapper_video_sec-1 Vertical_wrapper_video_sec_common">
          <img
            src="https://ark8.net/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F161230%2F2796x1573%2F981ca2286b%2Ftlb-hpban.jpg&w=1920&q=90"
            alt=""
          />
          <div className="tile__inner">
            <div className="tiles_inner_text">
              <Link href={""}>
                <h1>
                  RETURN TO <br /> THE LANDS BETWEEN{" "}
                </h1>
              </Link>
            </div>
            <Link href={""} className="tiles_inner_button">
              <span>SEE COLLECTION</span>
            </Link>
          </div>
        </div>
        <div className="Vertical_wrapper_video_sec Vertical_wrapper_video_sec-2 Vertical_wrapper_video_sec_common">
          <img
            src="https://ark8.net/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F161230%2F3000x2007%2Faa5a74f01f%2Fantihero-home-16x9-2.jpg&w=1920&q=90"
            alt=""
          />
          <div className="tile__inner">
            <div className="tiles_inner_text">
              <Link href={""}>
                <h1>
                  AFTER DARK: <br /> CHAPTER 1
                </h1>
              </Link>
            </div>
            <Link href={""} className="tiles_inner_button">
              <span>SEE COLLECTION</span>
            </Link>
          </div>
        </div>
        <div className="Vertical_wrapper_video_sec Vertical_wrapper_video_sec-3 Vertical_wrapper_video_sec_common">
          <img
            src="https://ark8.net/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F161230%2F3000x1688%2F5a3deae10e%2Foverwatch-home.jpg&w=1920&q=90"
            alt=""
          />
          <div className="tile__inner">
            <div className="tiles_inner_text">
              <Link href={""}>
                <h1>
                  FROM BUSAN <br /> TO HANAMURA
                </h1>
              </Link>
            </div>
            <Link href={""} className="tiles_inner_button">
              <span>SEE COLLECTION</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
