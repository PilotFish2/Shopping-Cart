import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./Showcase.module.css";
import ShowcaseItem from "./ShowcaseItem";

export default function SimpleSlider() {
  const [shopItems, setShopItems] = useState([]);

  const url = "https://fakestoreapi.com/products";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(setShopItems)
      .catch(console.error);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2400,
    cssEase: "ease-in-out",
    centerMode: true,
    centerPadding: "40px",
  };

  return (
    <div className={classes.sliderContainer}>
      <Slider {...settings}>
        {shopItems.map((item) => {
          return <ShowcaseItem key={item.id} item={item} />;
        })}
      </Slider>
    </div>
  );
}
