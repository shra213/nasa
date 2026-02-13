"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
const user_1 = __importDefault(require("./routes/user"));
const summarize_1 = __importDefault(require("./routes/summarize"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('public')); // ✅ Corre
app.get('/', (req, res) => {
    console.log("hi");
    res.send('nasa Api running');
});
app.get('/api', (req, res) => {
    console.log("hi");
    res.send('nasa Api running');
});
app.use('/api', summarize_1.default);
app.use('/api/user', user_1.default);
app.use('/api/otp', otpRoutes_1.default);
exports.default = app;
