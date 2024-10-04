import { DataTypes, Model} from "sequelize";
import { sequelize } from '../config/db.js'; 
import {v4 as uuid4} from 'uuid'
import bcrypt from 'bcryptjs'


class User extends Model {
checkPassword(password){
    return bcrypt.compareSync(password, this.password_hash);
}

}

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
    timestamps: true,
    hooks:{
        beforeCreate: async(user)=>{
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
        },
        beforeUpdate: async(user)=>{
            if (user.changed('password_hash')){
                const salt = await bcrypt.genSalt(10);
                user.password_hash = await bcrypt.hash(user.password_hash, salt);
            }
        }
    }
})

export default User 