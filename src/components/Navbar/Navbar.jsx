import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

export default function Navbar({ cartItems }) {
  const displayAmount = cartItems.reduce(
    (amount, item) => amount + item.quantity,
    0,
  );

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Store"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Store
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Checkout"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Checkout
          </NavLink>
        </li>
        <li className={classes.cartBadge}>{displayAmount}</li>
      </ul>
    </nav>
  );
}
