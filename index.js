import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import { ConnectDB } from "./src/DbConfig/ConnectDB.js"
import AuthRoutes from "./src/Routes/userRoutes.js"
import { errorHandler } from "./src/Middleware/ErrorHandlerMiddleware.js"



// Config
const app = express()
dotenv.config()


// Middlewaes
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())


// Connect DB
ConnectDB()


// APIs / Routes
app.use("/api/v1/user", AuthRoutes)


// Error Handler Middlewares !Must After Routes
app.use(errorHandler)


app.get("/", (req, res) => {
    res.status(200).send("Password Reset Backend Running...")
})


app.listen(process.env.PORT, () => {
    console.log(`Server Started At Port ${process.env.PORT}`)
})
