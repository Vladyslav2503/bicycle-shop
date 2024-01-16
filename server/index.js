const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const productRouter = require('./productRouter');
const path = require('path');
const feedbackRouter = require('./feedbackRouter');


const app = express()

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/goods', productRouter);
app.use('/feedback', feedbackRouter);
 

const start = async () => {
    try {
       await mongoose.connect(`mongodb+srv://cycleShop-:cycleShop-@cycleshop.lw2krad.mongodb.net/?retryWrites=true&w=majority`);
  
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)  
    } 
}  
   
start() 