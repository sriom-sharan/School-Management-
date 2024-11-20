const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json()); // Body parser
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
