const express = require('express');
const mongoose = require("mongoose")
const app = express();
require('dotenv').config()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// My Routes initalization
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product")
const categoryRoutes = require("./routes/category")
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes useage
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',productRoutes)
app.use('/api',categoryRoutes)

// DataBase Connection
mongoose.connect(process.env.Database, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{
    console.log("Database Connected...")
})

//PORT
const PORT = process.env.PORT || 5000;

// Running Server
app.listen(PORT, ()=>{
    console.log(`App running on port : ${PORT}`)
})