import React, { useEffect, useState } from 'react';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Cart from './Pages/Cart/Cart';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import bike1 from './image/bike1.jpg';
import bike2 from './image/bike2.jpg';
import bike3 from './image/bike3.jpg';
import bike4 from './image/bike4.jpg';
import accessorie1 from './image/accessorie1.jpg';
import accessorie2 from './image/accessorie2.jpg';
import accessorie3 from './image/accessorie3.jpg';
import accessorie4 from './image/accessorie4.jpg';
import ToTopLink from './components/ToTopLink';
import Bicycles from './Pages/Bicycles/Bicycles';
import Accessories from './Pages/Accessories/Accessories';
import SignInSide from './Pages/Login/Login';
import SignUpSide from './Pages/Registration/Registration';
import Contact from './Pages/Contact/Contact';
import AddProduct from './Pages/AddProduct/AddProduct';
import axios from 'axios';
import { useSelector } from 'react-redux';

function App() {
  const items = [
    {
      id: 1,
      name: `Ardis Shultz 27.5" 19" 2023`,
      type: 'Bicycles',
      image: bike1,
      price: 350,
      forWhom: "Unisex",
      color: "Red",
      typeOfBicycles: "Mountain bikes"
    },
    {
      id: 2,
      name: `Merida Big.Seven 15 27,2022`,
      type: 'Bicycles',
      image: bike2,
      price: 450,
      forWhom: "Unisex",
      color: "Black",
      typeOfBicycles: "Mountain bikes"
    },
    {
      id: 3,
      name: `Merida Big.Nine XT 29 2022`,
      type: 'Bicycles',
      image: bike3,
      price: 400,
      forWhom: "For men",
      color: "Black",
      typeOfBicycles: "Road bikes"
    },
    {
      id: 4,
      name: `Merida ENDURANCE 4000`,
      type: 'Bicycles',
      image: bike4,
      price: 350,
      forWhom: "For women",
      color: "Black",
      typeOfBicycles: "Mountain bikes"
    },
    {
      id: 5,
      name: `Bicycle Gloves Blue`,
      type: 'Accessories',
      image: accessorie1,
      price: 35,
      forWhom: "For men",
      color: "Blue",
      typeOfBicycles: "Gloves"
    },
    {
      id: 6,
      name: `Bicycle Gloves Gold`,
      type: 'Accessories',
      image: accessorie2,
      price: 45,
      forWhom: "Unisex",
      color: "Multi-colored",
      typeOfBicycles: "Gloves"
    },
    {
      id: 7,
      name: `Bicycle Gloves Red`,
      type: 'Accessories',
      image: accessorie3,
      price: 40,
      forWhom: "Unisex",
      color: "Red",
      typeOfBicycles: "Gloves"
    },
    {
      id: 8,
      name: `Bicycle Gloves Pink`,
      type: 'Accessories',
      image: accessorie4,
      price: 35,
      forWhom: "Unisex",
      color: "Red",
      typeOfBicycles: "Gloves"
    },
    {
      id: 9,
      name: `Bicycle Helmet Pink`,
      type: 'Accessories',
      image: 'https://nicewellenterprise.xyz/wp-content/uploads/2021/04/helmet-2.jpg',
      price: 35,
      forWhom: "Unisex",
      color: "Red",
      typeOfBicycles: "Helmet"
    },
    {
      id: 10,
      name: `Bicycle Helmet Green`,
      type: 'Accessories',
      image: 'https://nicewellenterprise.xyz/wp-content/uploads/2021/04/helmet-3.jpg',
      price: 35,
      forWhom: "For women",
      color: "Multi-colored",
      typeOfBicycles: "Helmet"
    },
    {
      id: 11,
      name: `Bicycle Helmet Pink`,
      type: 'Accessories',
      image: 'https://nicewellenterprise.xyz/wp-content/uploads/2021/04/helmet-4.jpg',
      price: 35,
      forWhom: "Unisex",
      color: "Multi-colored",
      typeOfBicycles: "Helmet"
    },
    {
      id: 13,
      name: `Bicycle Helmet Pink`,
      type: 'Accessories',
      image: 'https://nicewellenterprise.xyz/wp-content/uploads/2021/04/helmet-1.jpg',
      price: 35,
      forWhom: "Unisex",
      color: "Multi-colored",
      typeOfBicycles: "Helmet"
    },
    {
      id: 12,
      name: `BeDa LeDa Electric Bike`,
      type: 'Bicycles',
      image:
        'https://repedal.org/cdn/shop/products/H0a1d38f0b5e04b4f813220ba09ca57a0s.jpg?v=1692142498&width=1946',
      price: 1999,
      forWhom: "Unisex",
      color: "Black",
      typeOfBicycles: "City bicycles"
    },
    {
      id: 14,
      name: `BeDa LeDa Electric Bike`,
      type: 'Bicycles',
      image:
        'https://repedal.org/cdn/shop/products/H0a1d38f0b5e04b4f813220ba09ca57a0s.jpg?v=1692142498&width=1946',
      price: 1999,
      forWhom: "Unisex",
      color: "Black",
      typeOfBicycles: "City bicycles"
    },
    {
      id: 14,
      name: `BeDa LeDa Electric Bike`,
      type: 'Bicycles',
      image:
        'https://repedal.org/cdn/shop/products/H0a1d38f0b5e04b4f813220ba09ca57a0s.jpg?v=1692142498&width=1946',
      price: 1999,
      forWhom: "Unisex",
      color: "White",
      typeOfBicycles: "City bicycles"
    },
  ];

  const [productItems, setProductItems] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const { userRole, isAuth } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/goods/getAllGoods');
        setProductItems(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  return (
    <>
      <ToTopLink />
      <Routes>
        {isAuth === true && (
          <>
            <Route
              path="/"
              element={<Home items={productItems} cartItems={cartItems} setCartItems={setCartItems} />}
            />
            <Route path="/accessories" element={<Accessories items={productItems} cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/bicycles" element={<Bicycles items={productItems} cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}
        <Route path="/login" element={<SignInSide />} />
        <Route path="/registration" element={<SignUpSide />} />
        {userRole === 'ADMIN' && (
          <>
            <Route path="/addProduct" element={<AddProduct setItems={setProductItems} items={productItems} />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
