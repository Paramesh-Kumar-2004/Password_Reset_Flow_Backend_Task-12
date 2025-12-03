import express from "express"
import {
    ForgotPassword,
    LoginUser,
    RegisterUser
} from "../Controllers/userController.js"
import { Authentication } from "../Middleware/AuthMiddleware.js"



const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.get("/forgot", Authentication, ForgotPassword)


export default router
