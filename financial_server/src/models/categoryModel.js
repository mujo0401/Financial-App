import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/connectionService.js'; 

class Category extends Model {}

Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize, 
  modelName: 'Category' 
});

export default Category;
