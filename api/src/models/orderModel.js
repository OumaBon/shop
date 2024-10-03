import { DataTypes, Model } from "sequelize";
import sequelize from '../config/db.js'
import {v4 as uuidv4} from 'uuid'
import User from './userModel'
import OrderItems from "./orderItemModel.js";
import Transaction from "./transactionModel"
import Payment from "./paymentModel.js";
import Checkout from "./checkoutModel.js";

class Order extends Model {}

Order.init({
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
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    },
    shipping_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tracking_number: {
        type: DataTypes.STRING,
        allowNull: false,
        index: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'order',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define relationships
Order.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
User.hasMany(Order, { as: 'orders', foreignKey: 'user_id' });

Order.hasMany(OrderItems, { as: 'order_items', foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItems.belongsTo(Order, { as: 'order', foreignKey: 'order_id' });

Order.hasMany(Checkout, { as: 'checkouts', foreignKey: 'order_id', onDelete: 'CASCADE' });
Checkout.belongsTo(Order, { as: 'order', foreignKey: 'order_id' });

Order.hasMany(Transaction, { as: 'transactions', foreignKey: 'order_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Order, { as: 'order', foreignKey: 'order_id' });

Order.hasMany(Payment, { as: 'payment', foreignKey: 'order_id', onDelete: 'CASCADE' });
Payment.belongsTo(Order, { as: 'order', foreignKey: 'order_id' });


export default Order