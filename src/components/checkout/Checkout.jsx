import Navbar from "../Navbar/Navbar";
import classes from "./Checkout.module.css";
import { Link } from "react-router-dom";

export default function Checkout({ cartItems, setCartItems }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deleteItem = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const changeQuantity = (num, id) => {
    setCartItems((prev) => {
      const targetItem = prev.find((item) => item.id === id);
      if (!targetItem) return prev;
      if (targetItem.quantity === 1 && num === -1) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + num } : item,
      );
    });
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar cartItems={cartItems} />
        <div className={classes.empty}>
          <p>Please add some items to your cart.</p>
          <p>
            Return to the <Link to="/Store">Store</Link>.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar cartItems={cartItems} />
      <div className={classes.checkoutTable}>
        <h2>Checkout</h2>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sum</th>
              <th colSpan={3}></th>
            </tr>
            {cartItems?.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price.toFixed(2)} €</td>
                <td data-testid={`quantity-${item.id}`}>{item.quantity}</td>
                <td data-testid={`item-total-${item.id}`}>
                  {(item.quantity * item.price).toFixed(2)} €
                </td>
                <td>
                  {" "}
                  <button
                    className={classes.btnDec}
                    onClick={() => changeQuantity(-1, item.id)}
                  >
                    -
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    className={classes.btnInc}
                    onClick={() => changeQuantity(1, item.id)}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    className={classes.btnRemove}
                    onClick={() => deleteItem(item.id)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}></td>
              <td>Total:</td>
              <td> {total.toFixed(2)} €</td>
              <td colSpan={3}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
