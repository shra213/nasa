"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const index_1 = require("../db/index");
const models_1 = require("../db/models");
// import jwt from 'jsonwebtoken';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = await index_1.admin.auth().verifyIdToken(token);
        req.user = decoded; // contains uid, email, etc.
        const user = await models_1.User.findOne({ uid: decoded.uid });
        if (!user)
            return res.status(404).json({ message: "Profile not found" });
        console.log(req.user);
        console.log("hipagal");
        next();
    }
    catch (error) {
        console.error('Invalid token:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.verifyToken = verifyToken;
