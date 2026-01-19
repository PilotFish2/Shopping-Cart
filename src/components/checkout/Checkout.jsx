import Navbar from "../Navbar/Navbar";
import classes from "./Checkout.module.css";

export default function Checkout({ cartItems, setCartItems }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
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
        item.id === id ? { ...item, quantity: item.quantity + num } : item
      );
    });
  };

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
              <th></th>
            </tr>
            {cartItems?.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price.toFixed(2)} €</td>
                <td data-testid={`quantity-${item.id}`}>{item.quantity}</td>
                <td>{(item.quantity * item.price).toFixed(2)} €</td>
                <td>
                  {" "}
                  <button onClick={() => changeQuantity(-1, item.id)}>-</button>
                </td>
                <td>
                  {" "}
                  <button onClick={() => changeQuantity(1, item.id)}>+</button>
                </td>
                <td>
                  <button onClick={() => deleteItem(item.id)}>x</button>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>Total:</td>
              <td> {total.toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
