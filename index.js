import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import { ConnectDB } from "./src/DbConfig/ConnectDB.js"
import AuthRoutes from "./src/Routes/userRoutes.js"


// Config
const app = express()
dotenv.config()


// Middlewaes
app.use(cors())
app.use(express.json())
app.use(cookieParser())


// Connect DB
ConnectDB()


// APIs
app.use("/api/v1/user", AuthRoutes)



app.get("/", (req, res) => {
    res.status(200).send("Password Reset Backend Running...")
})


app.listen(process.env.PORT, () => {
    console.log(`Server Started`)
})