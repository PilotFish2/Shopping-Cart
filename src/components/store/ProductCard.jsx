import ProductStars from "./ProductStars";
import classes from "./Store.module.css";
import { useState } from "react";

export default function ProductCard({ item, setCartItems }) {
  const [quantity, setQuantity] = useState(0);

  const changeQuantity = (e) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + parseInt(e.target.value);
      return newQuantity > 0 ? newQuantity : 0;
    });
  };

  const inputQuantity = (e) => {
    const value = e.target.value.trim();
    return !isNaN(value) ? setQuantity(parseInt(value)) : "";
  };

  const addToCart = () => {
    setCartItems((prevCartItems) => {
      if (quantity <= 0) {
        console.log("No items to be added");
        return prevCartItems;
      }

      const existingItem = prevCartItems.find((x) => x.id === item.id);

      if (existingItem) {
        return prevCartItems.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + quantity } : x,
        );
      } else {
        return [...prevCartItems, { ...item, quantity }];
      }
    });
  };
  return (
    <div className={classes.card}>
      <div className={classes.imgContainer}>
        <img src={item.image} alt={item.title} />
      </div>

      <div className={classes.cardContent}>
        <h4>{item.title}</h4>

        <div className={classes.properties}>
          <p>{item.price.toFixed(2)} €</p>
          <ProductStars rating={item.rating.rate} count={item.rating.count} />
        </div>
      </div>

      <div className={classes.actions}>
        <div className={classes.quantityPanel}>
          <button value="-1" onClick={changeQuantity}>
            -
          </button>
          <input type="number" value={quantity} onChange={inputQuantity} />
          <button value="1" onClick={changeQuantity}>
            +
          </button>
        </div>

        <button className={classes.btnToCart} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
