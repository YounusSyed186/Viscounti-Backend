const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const menuRoutes = require('./Routes/MenuRoutes');
const imageRoutes = require('./Routes/imageRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/menu', menuRoutes);
app.use('/api', imageRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
