import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Homepage from "./components/homepage/Homepage";
import Store from "./components/store/Store";
import Checkout from "./components/checkout/Checkout";
import ErrorPage from "./components/Errorpage";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage cartItems={cartItems} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/store",
      element: <Store cartItems={cartItems} setCartItems={setCartItems} />,
    },
    {
      path: "/checkout",
      element: <Checkout cartItems={cartItems} setCartItems={setCartItems} />,
    },
  ]);

  return <RouterProvider router={router} />;
}
