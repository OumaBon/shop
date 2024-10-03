import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db'; 
import { v4 as uuidv4 } from 'uuid';
import User from './userModel';
import Order from './orderModel';


class Payment extends Model {}

Payment.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    payment_date: {
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
    modelName: 'Payment',
    tableName: 'payment',
    timestamps: false // No createdAt and updatedAt fields needed
});

// Define relationships
Payment.belongsTo(User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE' });
Payment.belongsTo(Order, { as: 'order', foreignKey: 'order_id', onDelete: 'CASCADE' });

export default Payment;
