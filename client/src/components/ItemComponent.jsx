import React from 'react';
import CartSvg from './CartSvg';

const ItemComponent = ({ id, image, name, type, price, cartItems, setCartItems, notify, handleImageClick}) => {
  const onAddToCart = () => {
    const newProduct = {
      id: id,
      image: image,
      name: name,
      type: type,
      price: price,
      quantity: 1,
    };

    const existingProductIndex = cartItems.findIndex((item) => item.id === newProduct.id);

    if (existingProductIndex !== -1) {
      const updatedProductItems = [...cartItems];
      updatedProductItems[existingProductIndex].quantity += 1;
      setCartItems(updatedProductItems);
    } else {
      setCartItems((prevProductItems) => [...prevProductItems, newProduct]);
    }
    notify();
  };

  return (
    <div className="product">
      <img src={`http://localhost:5000/static/${image}`} alt={`Товар ${id}`} onClick={() => handleImageClick(image)} />
      <p>{type}</p>
      <h2>{name}</h2>
      <p>${price.toFixed(2)}</p>
      <button className="add-to-cart" onClick={onAddToCart}>
        Add to Cart
        <CartSvg className="cart-image-dark" />{' '}
      </button>
    </div>
  );
};

export default ItemComponent;
