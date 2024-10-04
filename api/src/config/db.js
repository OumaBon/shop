// src/config/db.js
import { Sequelize } from "sequelize";
import winston from "winston";
import { fileURLToPath } from 'node:url'; 
import { dirname } from 'node:path';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../../db/development-data.sqlite'),
    logging: (msg, queryObj) => {
        logger.info(`Query: ${msg}`);
        logger.debug(`Query Options:`, queryObj)
    }
});

const dBConection = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection Established Successfully')
    } catch (err) {
        console.log(err);
        console.error('Unable to connect to the database', err);
        logger.error('Database Connection error:', err)
    }
}

// Change to default export
export {sequelize, dBConection}
