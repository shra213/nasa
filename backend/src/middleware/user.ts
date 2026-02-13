import { admin, auth } from "../db/index";
import { User } from "../db/models";
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const verifyToken = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }


    const token = authHeader.split(' ')[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded; // contains uid, email, etc.
        const user = await User.findOne({ uid: decoded.uid });
        if (!user) return res.status(404).json({ message: "Profile not found" });

        console.log(req.user);
        console.log("hipagal")
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
