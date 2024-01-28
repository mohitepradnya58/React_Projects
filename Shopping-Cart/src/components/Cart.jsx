import React from "react";

const Cart = ({ visibility, products, onClose, OnProductRemove }) => {
  return (
    <div style={{ display: visibility ? "block" : "none" }} className="p-8">
      <h2 className="text-xl relative mb-5 text-center">Shopping Cart</h2>
      <button
        onClick={onClose}
        className="bg-black text-white rounded-full grid place-content-center w-8 h-8 absolute right-4 md:right-1/4 top-7"
      >
        X
      </button>
      <div className="grid place-content-center">
        {products.length === 0 ? (
          <span>Your Basket is Empty</span>
        ) : (
          products.map((product) => (
            <div key={product.id} className="flex gap-4 items-center mb-5">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20"
              />
              <h3>{product.title}</h3>
              <span>{product.price * product.count}</span>
              <button
                onClick={() => OnProductRemove(product)}
                className="bg-black text-white text-sm rounded-lg border-black border hover:bg-white hover:text-black
                 p-3"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
