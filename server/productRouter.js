const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ProductModel = require('./models/Products');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './static/'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
});

const upload = multer({ storage: storage });

router.post('/addProducts', upload.single('image'), async (req, res) => {
    try {
        const { name, type, price, forWhom, color, typeOfBicycles} = req.body;
        const imgPath = req.file ? req.file.filename : null;

        const newGoods = new ProductModel({ 
            image: imgPath,
            name,
            type,
            price,
            forWhom,
            color,
            typeOfBicycles
        });

        await newGoods.save();

        res.status(201).json(newGoods);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/getAllGoods', async (req, res) => {
    try {
        const allGoods = await ProductModel.find();

        res.status(200).json(allGoods);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/goods/delete/:id', async (req, res) => {
    try {
        const goodsId = req.params.id;

        const deletedGoods = await ProductModel.findByIdAndDelete(goodsId);

        if (!deletedGoods) {
            return res.status(404).json({ error: 'Goods not found' });
        }

        const imagePath = deletedGoods.image;
        if (imagePath) {
            const fullPath = path.join(__dirname, 'static', imagePath);

            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath); 
            } else {
                console.warn(`File not found: ${fullPath}`);
            }
        }

        res.json({ message: 'Goods deleted successfully', deletedGoods });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;