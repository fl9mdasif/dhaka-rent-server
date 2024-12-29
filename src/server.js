
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const flatRoutes = require('./routes/flatRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/flats', flatRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.get("/", (req, res) => {
    res.send({
        Message: "React Native App",
    });
});

