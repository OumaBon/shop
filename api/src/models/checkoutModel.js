import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import User from './userModel.js';
import Address from './addressModel'
import Order from './orderModel.js';

class Checkout extends Model {}

Checkout.init({
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
    address_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Address,
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
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Checkout',
    tableName: 'checkout',
    timestamps: false // No createdAt and updatedAt fields needed
});

// Define relationships
Checkout.belongsTo(Order, { as: 'order', foreignKey: 'order_id', onDelete: 'CASCADE' });
Checkout.belongsTo(Address, { as: 'address', foreignKey: 'address_id', onDelete: 'CASCADE' });
Checkout.belongsTo(User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE' });

export default Checkout;
