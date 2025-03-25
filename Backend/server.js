const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors({ origin: 'http://localhost:8000' }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const workout = new mongoose.Schema({
    userid : String,required,
    date : Date,required,
    duration : Number,required,
    caloriesBurned : Number,
    exercises : {
        name:String,required,
        reps: Number,required,
        sets:Number,
        weight:Number
    }
});
const Workout = mongoose.model('workout', );


app.post('/workout', async (req, res) => {
    try {
        const workout = new workout(req.body);
        await workout.save();
        res.status(201).json({message: "workout log saved"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/workout', async (req, res) => {
    try {
        const workout = await workout.find();
        res.json({ message : "list of workouts", workout});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get('/workout/:userid', async (req, res) => {
    try {
        const workout = await workout.findById(req.params.id);
        res.json({ message : "list of workouts", workout});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/workout/:userid', async (req, res) => {
    try {
        const updatedworkout = await workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedworkout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/workout/:userid', async (req, res) => {
    try {
        await workout.findByIdAndDelete(req.params.id);
        res.json({ message: 'workout deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
