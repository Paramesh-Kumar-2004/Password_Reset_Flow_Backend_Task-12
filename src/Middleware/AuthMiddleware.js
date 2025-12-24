import User from "../Models/userModel.js";
import { jwtVerify } from "../Utils/JWT.js";



export const Authentication = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer "))
            return res.status(401).json({ message: "Unauthorized - No Token" });

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid Token" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Intenal Server Error"
        })
    }
}


export const Authorization = (roles) => {
    return (req, res, next) => {
        try {

            const user = req.user;
            if (!roles.includes(user.role)) {
                return res.status(403).json({
                    message: "Forbidden : You Don't Have Permission To Access This Resource"
                });
            }
            next();

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Intenal Server Error"
            })
        }
    }
}