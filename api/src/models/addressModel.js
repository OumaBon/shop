import sequelize from '../config/db.js'
import { DataTypes, Model } from 'sequelize'
import {v4 as uuidv4} from 'uuid'
import User from './userModel'


class Address extends Model {};

Address.init({
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: ()=>uuidv4(),
        allowNull: false,
        unique:true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    country:{
        type: DataTypes.STRING,
        allowNull: false,
        index: true
    },
    ward:{
        type: DataTypes.STRING,
        allowNull: false,
        index: true
    }

},{
    sequelize,
    modelName: "Address",
    tableName: "address",
    timestamps: true
});

User.hasMany(Address, {as: 'addresses', foreignKey:'user_id'});
Address.belongsTo(User, {as: 'user', foreignKey: 'user_id'});

export default Address; 
