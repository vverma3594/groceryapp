import  express from "express";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./router/productRouter";
import cors from 'cors';

const app : express.Application = express();

// configure cors
app.use(cors());

//config env
dotEnv.config({path:'./.env'});

//config  express to receive form data
app.use(express.json());

const hostName= process.env.Host_name;
const port:number | undefined = Number(process.env.PORT);
const MongoDbUrl= process.env.MONGO_DB_URL
//connect to mongodb
mongoose.connect(MongoDbUrl,).then(
    (response)=>{
        console.log('mongo db connected succesfully')
    }
).catch(
    (error)=>{
        console.log(error.message);
        process.exit(1); //stop node js process
    }
)

app.get('/',(request:express.Request, response:express.Response)=>{
    response.status(200).send("<h2>Express server is working</h2>")
})

//config routing
app.use('/api', productRouter);

app.listen(port,hostName, ()=>{
    console.log(`express sever is started http://${hostName}:${port}`)
})



