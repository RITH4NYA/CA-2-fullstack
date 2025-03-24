const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Address Schema & Model
const addressSchema = new mongoose.Schema({
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String
});
const Address = mongoose.model('Address', addressSchema);

// CRUD Routes
app.post('/addresses', async (req, res) => {
    try {
        const address = new Address(req.body);
        await address.save();
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/addresses', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/addresses/:id', async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/addresses/:id', async (req, res) => {
    try {
        await Address.findByIdAndDelete(req.params.id);
        res.json({ message: 'Address deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
