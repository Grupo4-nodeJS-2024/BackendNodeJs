const express = require('express');
const authRoutes = require ('./rutas/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.listen(PORT, () =>{
    console.log (`Server is running on port ${PORT}`);
    });