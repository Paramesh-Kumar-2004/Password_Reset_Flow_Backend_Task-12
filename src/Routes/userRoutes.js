import express from "express"
import {
    ForgotPassword,
    LoginUser,
    RegisterUser,
    ResetPassword
} from "../Controllers/userController.js"
import { Authentication } from "../Middleware/AuthMiddleware.js"



const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.post("/forgetpassword", ForgotPassword)
router.put("/resetpassword/:resetToken", ResetPassword)


export default router
