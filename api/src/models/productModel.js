import { DataTypes, Model } from "sequelize";
import {v4 as uuidv4} from "uuid"
import sequelize from '../config/db.js'
import Image from "./imageModel.js";
import Category from "./categoryModel.js";
import OrderItems from "./orderItemModel.js";
import CartItems from "./cartItemModel.js";

class Product extends Model {}

Product.init({
    id:{
        type:DataTypes.STRING,
        primaryKey: true,
        defaultValue:()=>uuidv4(),
        allowNullL: false,
        unique: true
    },
    category_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: Category,
            key: 'id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull: false,
        index: true
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull: false,
        index: true
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    }

},{
    sequelize,
    modelName: "Product",
    tableName:'product',
    timestamps: true
});

Product.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });
Category.hasMany(Product, { as: 'products', foreignKey: 'category_id' });

Product.hasMany(OrderItems, { as: 'order_items', foreignKey: 'product_id' });
OrderItems.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });

Product.hasMany(CartItems, { as: 'cart_items', foreignKey: 'product_id', onDelete: 'CASCADE' });
CartItems.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });

Product.hasMany(Image, { as: 'images', foreignKey: 'product_id', onDelete: 'CASCADE' });
Image.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });



export default Product