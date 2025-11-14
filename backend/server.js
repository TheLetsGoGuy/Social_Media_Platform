require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT || 5000;


connectDB(process.env.MONGO_URI);


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));