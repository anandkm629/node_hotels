const express = require('express');
const db = require('./db');
const Menu = require('./models/Menu')
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.json());

app.get('/', function(req,res) {
    res.send("Welcome to our HOTEL")
})
// Import the router files 

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes');

// Use the  router 
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})