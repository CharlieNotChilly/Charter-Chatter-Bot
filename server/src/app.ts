import express from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
config();

//morgan shows the requests and responses and the log informations, as a substitute of express.json() to
//get back the json messages, increase the readability.

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
//remove it in production
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use("/api/v1", appRouter)



export default app;