import Navbar from "../Navbar/Navbar";
import ProductGrid from "./ProductGrid";
import classes from "./Store.module.css";

export default function Store({ cartItems, setCartItems }) {
  return (
    <>
      <Navbar cartItems={cartItems} />
      <main className={classes.store}>
        <h2 className={classes.heading}>Our Bestsellers</h2>
        <ProductGrid setCartItems={setCartItems} />
      </main>
    </>
  );
}
