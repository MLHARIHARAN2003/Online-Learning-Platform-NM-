const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBConnection = require('./config/connect');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admin', require('./routers/adminRoutes'));
app.use('/api/user', require('./routers/userRoutes'));



DBConnection();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
