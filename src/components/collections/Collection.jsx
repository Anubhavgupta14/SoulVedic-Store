import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React from "react";
const collectionImages = [
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/7fc082731e2fd53cb6d462a01942c9776dca4faf-4000x3200.jpg?w=420&q=70&auto=format",
    label: "Ebra",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/f4ba5d51cfbdc91c8d42c1a14f98c5d5e8226669-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/75ecf9ba8c7ef3939ae88c0ccf42131bd67d0064-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/41f1a61ee6ff4e57d064513ba129f38615d3462f-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/93fd7eda75ca3cc2eb8967e65570af0482683de1-6400x8000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/368a53453843b25caeb7d2a5aa864a16d40c25f0-6400x8000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/8d43dcd2980fad6c70512ea100e76aaeaf09c48f-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/aa164d9a8fcf634268d27810b7ea09a7f22201c9-6400x8000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/48e95b12f904a9278094536732bc22d24fdb81b2-4000x3200.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/57cba2965121fba2682c091f219ec4edc1445588-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/e075d7074001d636bc12743d3214909c3511ac9e-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/9341e897c9f837927ca4073a1d6b100f4bac7422-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/4545e629b678c3d59aa207688c8cabb50c004274-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/4545e629b678c3d59aa207688c8cabb50c004274-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/ab974d02575a569c5208c4f0f0b03a84bb5e27da-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/75af05c3a8e43f23f3e1f088b7852c207810a44e-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/09eda91641d08a066bb67e61f994f4cbf4bd007a-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/0ad95f10bc2365c1128f6b1f1d9f51e1a534514e-4000x3200.jpg?w=420&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/8e66ff9ceb6149d4ab78cd15a9017e12bfbe89e5-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/422ee558331f7ead02f86d33c91f545dde162676-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/d445ec4136c92bc2b42417a870c1e307325498ca-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/31e74d4f166792051a73111106dce22e1ad02864-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/56ea5025e5adae51a6575d2cee3f76071fc45721-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/99fa66d8ee59ad17e09a41319270c2b2daa8ece2-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/f11e5503dd1ed8f86731dd5a267d38b3f459c0e8-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/e79927dd432d131fc274cc994499ac55a88a5a03-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/e7aa0492251e3d227e43a1e90c1e16ee7be765bf-3200x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/06a3d97b2911993ac53a41c19e817346d43e06ce-3201x4000.jpg?w=1024&q=70&auto=format",
  },
  {
    img: "https://cdn.sanity.io/images/h9gyalsq/production/6063eabced171f907724e7a804a6fee23f58478a-4000x3200.jpg?w=1024&q=70&auto=format",
  },
];

const Collection = () => {
  useGSAP(() => {
    const imagesCover = document.querySelectorAll(".Collection_image_cover");
    const numImagesCover = imagesCover.length;

    function setDynamicWidths() {
      imagesCover.forEach((ImgCover, index) => {
        let width;

        if (index === 0 || index === numImagesCover - 1) {
          width = "125px";
        } else if ((index >= 1 && index <= 7) || (index >= 9 && index <= 16)) {
          width = "80px";
        } else if (index >= 18 && index <= 27) {
          width = "80px";
        } else {
          width = "125px";
        }

        ImgCover.style.width = width;
      });
    }
    setDynamicWidths();
    // GSAP Hover Effects
    imagesCover.forEach((cover) => {
      cover.addEventListener("mouseenter", () => {
        gsap.to(imagesCover, {
          filter: "blur(10px)",
          duration: 0.3,
          // filter: 0.2,
          opacity: 0.5,
          ease: "power2.inOut",
        });
        gsap.to(cover, {
          filter: "blur(0px)",
          duration: 0.3,
          opacity: 1,
          ease: "power2.inOut",
        });
      });

      cover.addEventListener("mouseleave", () => {
        gsap.to(imagesCover, {
          filter: "blur(0px)",
          duration: 0.3,
          opacity: 1,
          ease: "power2.inOut",
        });
      });
    });
  });
  return (
    <div className="Collection_main">
      <div className="Collection_inner">
        <div className="Collection_top"></div>
        <div className="Collection_center_wrapper margin_cntr">
          {collectionImages.map((items, id) => {
            return (
              <div key={id} className="Collection_image_cover">
                <Link
                  href={"/"}
                  aria-label={items.label}
                  className="common_style_inherit image_link_tag_anim image_link_tag_grid"
                >
                  <div className="Collection_image_outer image_h-w">
                    <div className="Collection_image_inner_grid">
                      <img src={items.img} alt="" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="Collection_bottom">
          <Link href={""} className="common_style"></Link>
        </div>
      </div>
    </div>
  );
};

export default Collection;
