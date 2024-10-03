import { DataTypes, Model } from "sequelize";
import sequelize from '../config/db.js';
import {v4 as uuidv4} from 'uuid'
import User from './userModel.js' 

class Profile extends Model {}

Profile.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: ()=>uuidv4(),
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false,
        index: true
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false,
        index: true
    },
    phone_number:{
        type: DataTypes.INTEGER,
        allowNull: false,
        index: true
    },
    avater:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Profile',
    timestamps: true
});

User.hasOne(Profile, {as:'profile', foreignKey: 'user_id'});
Profile.belongsTo(User, {as: 'user', foreignKey: 'user_id'});

export default Profile;