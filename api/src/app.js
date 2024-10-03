import express from 'express';
import dotenv from 'dotenv'

dotenv.config()


import dBConection from './config/db.js';



const app = express()



const port = process.env.PORT || 4000;



app.use('/', (req, res)=>{
    res.send('<h1>Welcome</h1>')
});





app.listen(port, (req, res)=>{
    dBConection()
    console.log(`server up on port ${port}`)
})


