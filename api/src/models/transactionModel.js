import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { v4 as uuidv4 } from 'uuid';
import User from './userModel';
import Order from './orderModel';


class Transaction extends Model {}

Transaction.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
        unique: true
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transaction',
    timestamps: false 
});

// Define relationships
Transaction.belongsTo(Order, { as: 'order', foreignKey: 'order_id', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE' });

export default Transaction;
