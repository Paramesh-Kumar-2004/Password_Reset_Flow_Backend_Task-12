import express from "express"
import {
    ForgotPassword,
    GetUserDetails,
    LoginUser,
    RegisterUser,
    ResetPassword,
} from "../Controllers/userController.js"
import { Authentication } from "../Middleware/AuthMiddleware.js"



const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.post("/forgetpassword", ForgotPassword)
router.put("/resetpassword/:id/:resetToken", ResetPassword)
router.get("/getuser", Authentication, GetUserDetails)



export default router
