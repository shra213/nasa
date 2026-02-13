import express from 'express';
import otpRouter from './routes/otpRoutes';
import userRouter from './routes/user';
import summarize from './routes/summarize';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // ✅ Corre
app.get('/', (req, res) => {
    console.log("hi");
    res.send('nasa Api running');
});
app.get('/api', (req, res) => {
    console.log("hi");
    res.send('nasa Api running');
});
app.use('/api', summarize);
app.use('/api/user', userRouter);
app.use('/api/otp', otpRouter);

export default app;
