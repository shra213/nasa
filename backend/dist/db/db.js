"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB = async () => {
    try {
        // await mongoose.connect(`mongodb+srv://mongo:mongo123@cluster0.ziopl.mongodb.net/nasa?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("MongoDB Connected");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
