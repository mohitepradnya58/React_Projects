import React from "react";
import CartSvg from "../assets/cart.svg";

const Navbar = ({ productInCart, setCartVisibility }) => {
  return (
    <>
      <div className="bg-black px-8 py-3 text-white flex justify-between">
        <h1 className="text-xl">LOGO</h1>
        <ul className="flex gap-4">
          <li>
            <a href="/" title="Home">
              Home
            </a>
          </li>
          <li>
            <a href="#" title="Shop">
              Shop
            </a>
          </li>
        </ul>
        <button onClick={() => setCartVisibility(true)} className="flex">
          <img src={CartSvg} alt="Cart" className="w-8 h-8 relative" />
          <button>
            {productInCart.length > 0 && (
              <span className="bg-white text-black rounded-full w-3 h-3 grid place-content-center p-2.5 text-sm numBtn">
                {productInCart.length}
              </span>
            )}
          </button>
        </button>
      </div>
    </>
  );
};

export default Navbar;
