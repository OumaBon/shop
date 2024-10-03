import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js'; 
import { v4 as uuidv4 } from 'uuid';
import Cart from './cartModel.js';
import Product from './productModel.js';


class CartItems extends Model {}

CartItems.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
        unique: true
    },
    cart_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Cart,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.00
    },
    created_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'CartItems',
    tableName: 'cart_item',
    timestamps: false // No createdAt and updatedAt fields needed
});

// Define relationships
CartItems.belongsTo(Cart, { as: 'cart', foreignKey: 'cart_id', onDelete: 'CASCADE' });
CartItems.belongsTo(Product, { as: 'product', foreignKey: 'product_id', onDelete: 'CASCADE' });

export default CartItems;
