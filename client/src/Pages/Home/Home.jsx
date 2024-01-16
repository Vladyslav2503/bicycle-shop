import React from 'react';
import './Home.css';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ItemComponent from '../../components/ItemComponent';

import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';

const Home = ({ items, cartItems, setCartItems }) => {
  const notify = () =>
    toast.success('You added the product to the cart!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const slider1 = {
    infinite: true,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div>
      <ToastContainer />
      <header>
        <Header />
        <div className="header-content">
          <h4>Newly Launched</h4>
          <h1>
            Trek Marlin 7 <br /> Gen 3 2023
          </h1>
          <h5>Specifications:</h5>
          <ul>
            <li>Frame and Suspension</li>
            <li>Gear Shifting System</li>
            <li>Wheels and Brakes</li>
          </ul>
          <a className="button_buy" href="#">
            BUY NOW
          </a>
        </div>
      </header>
      <div className="slider-wrapper">
        <Slider {...slider1}>
          {items.map(
            ({ _id, image, name, type, price }) =>
              type === 'Bicycles' && (
                <ItemComponent
                  key={_id}
                  id={_id}
                  image={image}
                  name={name}
                  type={type}
                  price={price}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  notify={notify}
                />
              ),
          )}
        </Slider>
      </div>

      <section className="discover_collection">
        <div className="collection_section">
          <div className="collection_content">
            <h5>Discover The Collection</h5>
            <h3>Mountain Bikes</h3>
            <p>
              These are the key characteristics of the mountain bike, making it efficient and
              comfortable for riding in mountainous and forested conditions.
            </p>
            <ul>
              <li>Frame and Suspension</li>
              <li>Gear Shifting System</li>
              <li>Wheels and Brakes</li>
            </ul>
            <a className="button_buy" href="#">
              EXPLORE NOW
            </a>
          </div>
        </div>

        <div className="collection_section">
          <div className="collection_content">
            <h5>Discover The Collection</h5>
            <h3>City Bikes</h3>
            <p>
              The city bike is designed for convenient and safe travel in urban environments, where
              comfort and reliability are of great importance.
            </p>
            <ul>
              <li>Frame and Suspension</li>
              <li>Gear Shifting System</li>
              <li>Wheels and Brakes</li>
            </ul>
            <a className="button_buy" href="#">
              EXPLORE NOW
            </a>
          </div>
        </div>

        <div className="collection_section">
          <div className="collection_content">
            <h5>Discover The Collection</h5>
            <h3>Speciality Bikes</h3>
            <p>
              This specialized bike is designed for high-speed training and competition, where
              aerodynamics and performance are key factors.
            </p>
            <ul>
              <li>Frame and Suspension</li>
              <li>Gear Shifting System</li>
              <li>Wheels and Brakes</li>
            </ul>
            <a className="button_buy" href="#">
              EXPLORE NOW
            </a>
          </div>
        </div>
      </section>

      <div className="slider-wrapper">
        <Slider {...slider1}>
          {items.map(
            ({ _id, image, name, type, price }) =>
              type === 'Accessories' && (
                <ItemComponent
                  key={_id}
                  id={_id}
                  image={image}
                  name={name}
                  type={type}
                  price={price}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  notify={notify}
                />
              ),
          )}
        </Slider>
      </div>

      <section className="all_new">
        <h4>The All New</h4>
        <h2>Trek Marlin 7 Gen 3 2023 Is Here</h2>
        <p>
          The bicycle is designed for urban and mountainous journeys, offering riders high quality,
          control, and a wide range of speed options for conquering the most challenging terrains.
        </p>
        <a className="button_buy" href="#">
          SHOP NOW
        </a>
      </section>
    </div>
  );
};

export default Home;
