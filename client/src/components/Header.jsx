import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cycleLogo from '../image/logo-1.png';
import CartSvg from './CartSvg';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsAuth } from '../store/reducers/UserSlice';
import AddIcon from '@mui/icons-material/Add';

const Header = () => {

  const dispatch = useDispatch()
  const { userRole } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    window.localStorage.setItem('role', userRole);
  }, [userRole]);

  return (
    <div className="top-bar">
      <Link to="/">
        <img src={cycleLogo} alt="logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bicycles">Bicycles</Link>
          </li>
          <li>
            <Link to="/accessories">Accessories</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Reviews</Link>
          </li>
        </ul>
      </nav>
      <Link className='center-link' to="/cart">
        <CartSvg fill="#fff" className="cart-navigation" />
      </Link>
      <Link className='center-link' onClick={() => (localStorage.removeItem('token'), dispatch(updateIsAuth(false))) } to="/login">
        <LogoutIcon style={{ marginLeft: "50px", fontSize: "37px" }} fill="#fff" className="cart-navigation" />
      </Link>
      {userRole === 'ADMIN' && (
        <Link className='center-link'  to="/addProduct">
          <AddIcon style={{ marginLeft: "50px", fontSize: "37px" }} fill="#fff" className="cart-navigation" />
        </Link>
      )}
    </div>
  );
};

export default Header;
