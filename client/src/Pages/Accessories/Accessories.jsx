import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './Accessories.css';
import ItemComponent from '../../components/ItemComponent';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import { InputAdornment, Modal, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const itemsPerPage = 4;

const Accessories = ({ items, cartItems, setCartItems }) => {

  const [typeBicycles, setTypeBicycles] = useState([
    { type: "All", selected: true },
    { type: "Gloves", selected: false },
    { type: "Helmet", selected: false },
    { type: "Knee pads", selected: false },
    { type: "Сycling suits", selected: false },
    { type: "Other", selected: false },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(localStorage.getItem('selectedColor') || null);
  const [selectedForWhom, setSelectedForWhom] = useState(localStorage.getItem('selectedForWhom') || null);
  const [selectedType, setSelectedType] = useState(localStorage.getItem('selectedType') || null);
  const [searchText, setSearchText] = useState(localStorage.getItem('searchText') || '');
  const [from, setFrom] = useState(localStorage.getItem('from') || '');
  const [to, setTo] = useState(localStorage.getItem('to') || '');


  const itemsToDisplay = items
    .filter(({ type, name, price, color, forWhom, typeOfBicycles }) =>
      type === 'Accessories' &&
      (!from || price >= from) &&
      (!to || price <= to) &&
      (!selectedColor || color === selectedColor) &&
      (!selectedForWhom || forWhom === selectedForWhom) &&
      (!selectedType || (selectedType === "All" || typeOfBicycles === selectedType)) &&
      (!searchText || name.toLowerCase().includes(searchText.toLowerCase()))
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsToDisplay.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (selectedColor !== null) {
      localStorage.setItem('selectedColor', selectedColor);
    } else {
      localStorage.removeItem('selectedColor');
    }
    if (selectedForWhom !== null) {
      localStorage.setItem('selectedForWhom', selectedForWhom);
    } else {
      localStorage.removeItem('selectedForWhom');
    }
    if (selectedType !== null && selectedType !== "All") {
      localStorage.setItem('selectedType', selectedType);
    } else {
      localStorage.removeItem('selectedType');
    }
    
  }, [selectedColor, selectedForWhom, selectedType]);

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

  const handleColorChange = (color) => {
    setSelectedColor(selectedColor === color ? null : color);
  };

  const handleForWhomChange = (category) => {
    setSelectedForWhom(selectedForWhom === category ? null : category);
  };

  const handleTypeChange = (type) => {
    const updatedTypes = typeBicycles.map((t) => ({
      ...t,
      selected: t.type === type,
    }));
    setTypeBicycles(updatedTypes);
    setSelectedType(type === "All" ? null : type);
  };

  return (
    <div className='aboutHeader' >
      <ToastContainer />
      <Header />
      <div className='allPanel' >
        <div className='leftPanel'>
          <h2 style={{ paddingTop: "15px", fontWeight: "900" }}>FILTERES</h2>
          <TextField
            sx={{
              '& .MuiInputLabel-root': {
                color: 'white',  
              },
              '& .MuiOutlinedInput-root': {
                color: 'white',           
                '& fieldset': {
                  borderColor: 'white',   
                },
                '&::placeholder': {
                  color: 'white',         
                },
              },
              '& .MuiInputAdornment-root': {
                color: 'white',  
              },
            }}
            placeholder='Search'
            label="Search"
            onChange={(e) => {
              const inputValue = e.target.value;
              setSearchText(inputValue);
              localStorage.setItem('searchText', inputValue);
            }}
            value={searchText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <h3 style={{ paddingTop: "15px", fontWeight: "900" }}>TYPES OF ACCESSORIES</h3>
          <div style={{ textAlign: "left", marginLeft: "90px", marginTop: "10px", marginBottom: "15px" }}>
            {typeBicycles.map((type) => (
              <div
                key={type.type}
                style={{ textDecoration: type.selected ? "underline" : "none", cursor: "pointer" }}
                onClick={() => handleTypeChange(type.type)}
              >
                {type.type}
              </div>
            ))}
          </div>
          <h3 className='priceheader'>PRICE</h3>
          <div className='price'>
            <input placeholder='from' className='textinput'
              value={from}
              onChange={(e) => {
                const fromValue = e.target.value;
                setFrom(fromValue);
                localStorage.setItem('from', fromValue);
              }}
            />
            <input placeholder='to' className='textinput'
              value={to}
              onChange={(e) => {
                const toValue = e.target.value;
                setTo(toValue);
                localStorage.setItem('to', toValue);
              }}
            />
          </div>
          <h3 style={{ marginTop: "20px", color: "#FFFFFF", fontWeight: "900" }}>FOR WHOM</h3>
          <div className='forwhom'>
            {['For men', 'For women', 'For children', 'Unisex'].map((category) => (
              <div key={category}>
                <input
                  className='checkbox'
                  type='checkbox'
                  checked={selectedForWhom === category}
                  onChange={() => handleForWhomChange(category)}
                />
                <span>{category}</span>
              </div>
            ))}
            <h3 style={{ marginTop: "20px", color: "#FFFFFF", marginBottom: "15px", fontWeight: "900" }}>COLOR</h3>
            <div>
              {['Black', 'White', 'Red', 'Blue', 'Multi-colored'].map((color) => (
                <div key={color}>
                  <input
                    className='checkbox'
                    type='checkbox'
                    checked={selectedColor === color}
                    onChange={() => handleColorChange(color)}
                  />
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", height: "900px", borderTop: "1px solid white" }}>
          {currentItems.map(
            ({ _id, image, name, type, price }) =>
              type === 'Accessories' && (
                <div style={{ width: "450px", marginTop: "5px", marginLeft: "78px", marginRight: "80px" }} >
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
                    handleImageClick={handleImageClick}
                  />
                </div>
              ),
          )}
        </div>
      </div>

      <Pagination
        sx={{
          '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: '#fff',
            color: '#000',
          },
          '& .MuiPaginationItem-page': {
            color: '#fff',
          },
          '& .MuiPaginationItem-icon': {
            color: '#fff', 
          },
        }}
        count={Math.ceil(itemsToDisplay.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{ display: "flex", justifyContent: 'center', marginTop: "-112px", marginLeft: "310px" }} 
      />

      <Modal open={selectedImage !== null} onClick={handleCloseModal}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={`http://localhost:5000/static/${selectedImage}`} alt="Selected" style={{ maxWidth: '80%', maxHeight: '80%' }} />
        </div>
      </Modal>

    </div>
  )
}
export default Accessories