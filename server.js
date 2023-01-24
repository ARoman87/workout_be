require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
const PORT = process.env.PORT || 4000
const cors = require("cors")

const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")

// Express app
const app = express()
app.use(cors())

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)



// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for request
        app.listen(PORT, () => {
        console.log("Connected to db and listening on port", PORT)
})
    })
    .catch((error) => {
        console.log(error)
    }) 



