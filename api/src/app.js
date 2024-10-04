import express from 'express';
import dotenv from 'dotenv'
import cookiePaser from 'cookie-parser'
dotenv.config();
import {dBConection} from './config/db.js';
import userRoutes from './routes/userRoute.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';


const port = process.env.PORT || 4000;

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookiePaser());

app.use('/apiV1/users', userRoutes);
app.use(errorHandler)
app.use(notFound)


app.listen(port, (req, res)=>{
    dBConection()
    console.log(`server up on port ${port}`)
})


