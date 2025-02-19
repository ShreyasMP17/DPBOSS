require('dotenv').config(); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = require('./Routes/routes');



// Use the environment variables
const dbURL = process.env.MONGODB_URI; // MongoDB URI from .env
const PORT = process.env.PORT || 3000; // Use PORT from .env or fallback to 3000
const HOST = '0.0.0.0';

app.use(cors({origin:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database...");
}).catch((error) => {
    console.error("Error connecting to database:", error);
});

app.use('/', Router);

app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
