import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import Checkout from "../components/checkout/Checkout.jsx";
import testdata from "./testdata.js";

describe("Checkout component", () => {
  function CheckoutWrapper({ initialItems }) {
    const [cartItems, setCartItems] = React.useState(initialItems);

    return <Checkout cartItems={cartItems} setCartItems={setCartItems} />;
  }

  it("renders an item correctly in the table", () => {
    const cartItems = [
      {
        ...testdata[0],
        quantity: 2,
      },
    ];

    render(
      <MemoryRouter>
        <Checkout cartItems={cartItems} setCartItems={() => {}} />;
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"),
    ).toBeInTheDocument();

    expect(screen.getByText("109.95 €")).toBeInTheDocument();

    expect(screen.getAllByText("219.90 €")).not.toHaveLength(0);

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3);
  });

  it("renders an sum of items correctly", () => {
    const cartItems = [
      {
        ...testdata[0],
        quantity: 1,
      },
      {
        ...testdata[1],
        quantity: 2,
      },
    ];

    render(
      <MemoryRouter>
        <Checkout cartItems={cartItems} setCartItems={() => {}} />;
      </MemoryRouter>,
    );

    expect(screen.getByText("154.55 €")).toBeInTheDocument();
  });

  it("delete Btn click removes respective item", async () => {
    const user = userEvent.setup();

    const cartItems = [
      {
        ...testdata[0],
        quantity: 1,
      },
      {
        ...testdata[1],
        quantity: 2,
      },
    ];

    render(
      <MemoryRouter>
        <CheckoutWrapper initialItems={cartItems} />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"),
    ).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole("button", { name: "x" });

    await user.click(deleteButtons[0]);

    expect(
      screen.queryByText(
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      ),
    ).not.toBeInTheDocument();
  });

  it("increases and decreases the quantity of a specific item", async () => {
    const user = userEvent.setup();
    const cartItems = [{ ...testdata[0], quantity: 1 }];

    render(
      <MemoryRouter>
        <CheckoutWrapper initialItems={cartItems} />
      </MemoryRouter>,
    );

    const incBtn = screen.getByRole("button", { name: "+" });
    const decBtn = screen.getByRole("button", { name: "-" });

    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(decBtn);

    expect(screen.getByTestId(`quantity-${testdata[0].id}`)).toHaveTextContent(
      "2",
    );
  });

  it("calculates the total price correctly after quantity change", async () => {
    const user = userEvent.setup();
    const cartItems = [{ ...testdata[0], quantity: 1 }];

    render(
      <MemoryRouter>
        <CheckoutWrapper initialItems={cartItems} />
      </MemoryRouter>,
    );

    const incBtn = screen.getByRole("button", { name: "+" });
    const decBtn = screen.getByRole("button", { name: "-" });

    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(decBtn);
    expect(
      screen.getByTestId(`item-total-${testdata[0].id}`),
    ).toHaveTextContent("219.90 €");
  });

  it("removes item when quantity is decreased from 1 to 0", async () => {
    const user = userEvent.setup();
    const cartItems = [{ ...testdata[0], quantity: 1 }];

    render(
      <MemoryRouter>
        <CheckoutWrapper initialItems={cartItems} />
      </MemoryRouter>,
    );

    const decBtn = screen.getByRole("button", { name: "-" });
    await user.click(decBtn);

    expect(screen.queryByText(testdata[0].title)).not.toBeInTheDocument();
  });
});
