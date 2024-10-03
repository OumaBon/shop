import { DataTypes, Model} from "sequelize";
import sequelize from '../config/db.js';
import {v4 as uuid4} from 'uuid'


class User extends Model {}

User.init({
    id: {
        type: DataTypes.STRING(30),
        primaryKey:true,
        defaultValue: ()=> uuid4(),
        allowNull: false,
        unique: true         
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        index: true
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique:true,
        index: true
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: true
})


export default User 



















const User = sequelize.define('User', {
    id: {
        type:DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }

}, {timestamps: true})