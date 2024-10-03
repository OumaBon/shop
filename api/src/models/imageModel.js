import { DataTypes, Model } from "sequelize";
import {v4 as uuidv4} from 'uuid';
import sequelize from '../config/db.js';
import Product from './productModel.js';


class Image extends Model {};
Image.init({
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: ()=>uuidv4(),
        allowNull:false,
        unique: true
    },
    product_id:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: Product,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Image',
    tableName: 'image',
    timestamps: true
})

Image.belongsTo(Product, {as:'product', foreignKey: 'product_id'});
Product.hasMany(Image,{as: 'images', foreignKey: 'product_id', onDelete: "CASCADE"});

export default Image;