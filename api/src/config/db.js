import { Sequelize } from "sequelize";
import winston from "winston";



const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'combined.log'})
    ]
});


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '..../db/development-data.sqlite',
    logging: (msg, queryObj)=>{
        logger.info(`Query: ${msg}`);
        logger.debug(`Query Options:`, queryObj)
    }
});


const dBConection = async ()=>{
    try{
        await sequelize.authenticate();
        logger.info('Connection Establised Succefully')


    }catch (err){
        console.log(err)
        console.error('Unable to connect to the database', err);
        logger.error('Database Connection error:', err)
    }
}

export default dBConection; 