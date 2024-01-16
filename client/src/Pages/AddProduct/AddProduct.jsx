import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import axios from 'axios'; 
import Header from '../../components/Header';
import SearchIcon from '@mui/icons-material/Search';

import "./AddProduct.css";
 
const AddProduct = ({ items, setItems }) => {
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [forWhom, setForWhom] = useState('');
    const [color, setColor] = useState('');
    const [typeBicycles, setTypeBicycles] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleAddProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('name', productName);
            formData.append('type', productType);
            formData.append('price', productPrice);
            formData.append('forWhom', forWhom);
            formData.append('color', color);
            formData.append('typeOfBicycles', typeBicycles);
            formData.append('image', productImage);

            const response = await axios.post('http://localhost:5000/goods/addProducts', formData);

            console.log('Product added successfully', response.data);

            setItems([...items, response.data]);

            setProductName('');
            setProductType('');
            setProductPrice('');
            setForWhom('');
            setColor('');
            setTypeBicycles('');
            setProductImage(null);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleRemoveClick = async (index, productId) => {
        console.log('Removing product with ID:', productId);
        try {
          const response = await axios.delete(`http://localhost:5000/goods/goods/delete/${productId}`);
          console.log('Product removed successfully', response.data);
      
          const updatedItems = [...items];
          updatedItems.splice(index, 1);
          setItems(updatedItems);
        } catch (error) {
          console.error('Error removing product:', error);
        }
      };

    return (
        <>
            <div style={{ background: "black" }}>
                <Header />
            </div>
            <div style={{ background: "rgba(189, 215, 202, 0.252)", paddingBottom: "40px" }}>
                <div className='formAddGoods'>
                    <div className='inputs'>
                    <TextField
                            style={{ marginRight: '20px' }}
                            type='text'
                            placeholder='Enter name'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <TextField
                            style={{ marginRight: '20px' }}
                            type='text'
                            placeholder='Enter type'
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                        />
                        <TextField
                            style={{ marginRight: '20px' }}
                            type='text'
                            placeholder='Enter price'
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                        <TextField
                            style={{ marginRight: '20px' }}
                            type='text'
                            placeholder='Enter for whom'
                            value={forWhom}
                            onChange={(e) => setForWhom(e.target.value)}
                        />
                        <TextField
                            style={{ marginRight: '20px' }}
                            type='text'
                            placeholder='Enter color'
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <TextField
                            type='text'
                            placeholder='Enter type of bicycles'
                            value={typeBicycles}
                            onChange={(e) => setTypeBicycles(e.target.value)}
                        />
                    </div>
                    <div className='fileInputWrapper'>
                        <button className='addButton fileInputButton' type='button'>
                            Choose File
                        </button>
                        <input
                            className='fileInput'
                            type='file'
                            onChange={(e) => setProductImage(e.target.files[0])}
                        />
                    </div>
                    {productImage && <img alt='Preview' src={productImage ? URL.createObjectURL(productImage) : ''} style={{ marginTop: '20px', }} />}
                    <button style={{ width: "400px", height: "40px", marginTop: "20px" }} className='fileInputButton' type='button' onClick={handleAddProduct}>
                        Add
                    </button>
                </div>

                <div style={{ marginLeft: '60px' }}>
                    <Grid container spacing={3}>
                        {items.map((goods, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <div className='product' style={{ height: '520px' }}>
                                    <img src={`http://localhost:5000/static/${goods.image}`} alt={`Image for ${goods.name}`} style={{ marginTop: '20px', width: '400px', height: '400px', objectFit: 'contain' }} />
                                    <div className='description'>
                                        <div>
                                            <p>
                                                <b>{goods.name}</b>
                                            </p>
                                            <p>{goods.type}</p>
                                            <p>${goods.price}</p>
                                        </div>
                                        <div>
                                            <p>
                                                {goods.typeOfBicycles}
                                            </p>
                                            <p>{goods.color}</p>
                                            <p>{goods.forWhom}</p>
                                        </div>
                                    </div>
                                    <button style={{ marginBottom: '30px' }} className='addButton' onClick={() => {console.log(goods._id); handleRemoveClick(index, goods._id);}}>
                                        REMOVE
                                    </button>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default AddProduct;
