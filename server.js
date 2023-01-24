require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
const cors = require("cors")

const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")

// Express app
const app = express()
app.use(cors({
    origin: ["http://localhost:5173", "https://workout-log.onrender.com/"]
}))

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)


const port = process.env.PORT || 4000
// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for request
        app.listen(port, () => {
        console.log("Connected to db and listening on port", port)
})
    })
    .catch((error) => {
        console.log(error)
    }) 



