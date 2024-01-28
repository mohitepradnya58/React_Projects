import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import products from "./data";
import Cart from "./Cart";

const Shop = () => {
  const [cartVisibility, setCartVisibility] = useState(false);
  const [productInCart, setProducts] = useState(
    JSON.parse(localStorage.getItem("myshop-data")) || []
  );

  useEffect(() => {
    localStorage.setItem("myshop-data", JSON.stringify(productInCart));
  }, [productInCart]);

  const AddProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProducts([...productInCart, newProduct]);
  };

  const OnProductRemove = (productToRemove) => {
    const updateCart = productInCart.filter(
      (product) => product.id !== productToRemove.id
    );
    setProducts(updateCart);
  };

  return (
    <div>
      <Cart
        visibility={cartVisibility}
        products={productInCart}
        onClose={() => setCartVisibility(false)}
        OnProductRemove={OnProductRemove}
      />
      <Navbar
        productInCart={productInCart}
        setCartVisibility={setCartVisibility}
      />
      <div className="p-8">
        <h1 className="text-center mb-8 text-3xl">
          Clothing, Jewellery and Much More!
        </h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="lg:w-1/5 md:w-1/3 box p-4 rounded-2xl"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-52 h-52 mb-5"
              />
              <h4 className="pb-1 text-sm">{product.title}</h4>
              <p className="mb-1 text-xs">{product.category}</p>
              <p className="mb-1 text-sm">{`${product.rating.rate} (${product.rating.count} reviews)`}</p>
              <p className="mb-1 text-xl font-bold mb-3">₹{product.price}</p>
              <div>
                <button
                  onClick={() => AddProductToCart(product)}
                  className="bg-black text-white text-sm rounded-lg border-black border hover:bg-white hover:text-black
                 p-3"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
