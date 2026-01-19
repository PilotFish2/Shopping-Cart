import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Checkout from "../components/checkout/Checkout.jsx";
import testdata from "./testdata.js";

describe("Checkout component", () => {
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
      </MemoryRouter>
    );
    expect(
      screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
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
      </MemoryRouter>
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
        <Checkout cartItems={cartItems} setCartItems={() => {}} />;
      </MemoryRouter>
    );

    const btnDeleteItem = screen.getAllByRole("button", { name: "x" });

    await user.click(btnDeleteItem[0]);

    expect(
      screen.queryByText(
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
      )
    ).not.toBeInTheDocument();
  });

  it("increases and decreases the quantity of a specific item", async () => {
    const user = userEvent.setup();
    const setCartItems = vi.fn();

    render(
      <MemoryRouter>
        <Checkout
          cartItems={[{ ...testdata[0], quantity: 1 }]}
          setCartItems={setCartItems}
        />
      </MemoryRouter>
    );

    const incBtn = screen.getByRole("button", { name: "+" });
    const decBtn = screen.getByRole("button", { name: "-" });
    const quantity = screen.getByTestId(`quantity-${testdata[0].id}`);

    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(decBtn);

    expect(quantity).toHaveTextContent("2");
  });
});
