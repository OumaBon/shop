import { DataTypes, Model } from "sequelize";
import {v4 as uuid4} from 'uuid'
import sequelize from '../config/db.js'
import Product from "./productModel.js";


class Category extends Model {};

Category.init({
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue:()=>uuid4(),
        allowNull:false,
        unique:true
    },
    category_name:{
        type: DataTypes.STRING,
        allowNull:false,
        index: true
    },

},{
    sequelize,
    modelName:'Category',
    tableName: 'category',
    timestamps: true
});

Category.hasMany(Product, {as:'products', foreignKey:'category_id', onDelete: 'CASCADE'});
Product.belongsTo(Category, {as:'category', foreignKey:'category_id'});

export default Category