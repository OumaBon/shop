import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import Order from './orderModel.js';
import Product from './productModel.js';


class OrderItems extends Model {}

OrderItems.init({
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
        allowNull: false,
        index: true
    }
}, {
    sequelize,
    modelName: 'OrderItems',
    tableName: 'order_item',
    timestamps: false 
});

// Define relationships
OrderItems.belongsTo(Order, { as: 'order', foreignKey: 'order_id' });
Order.hasMany(OrderItems, { as: 'order_items', foreignKey: 'order_id', onDelete: 'CASCADE' });

OrderItems.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });
Product.hasMany(OrderItems, { as: 'order_items', foreignKey: 'product_id', onDelete: 'CASCADE' });

export default OrderItems;
