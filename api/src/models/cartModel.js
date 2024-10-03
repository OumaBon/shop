import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import User from './userModel.js';
import CartItems from './cartItemModel.js';


class Cart extends Model {}

Cart.init({
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
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW // Automatically updates timestamp on row change
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        index: true
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    item_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Cart',
    tableName: 'cart',
    timestamps: false // No createdAt and updatedAt fields needed
});

// Define relationships
Cart.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
User.hasOne(Cart, { as: 'cart', foreignKey: 'user_id', onDelete: 'CASCADE' });

Cart.hasMany(CartItems, { as: 'cart_items', foreignKey: 'cart_id', onDelete: 'CASCADE' });

export default Cart;
