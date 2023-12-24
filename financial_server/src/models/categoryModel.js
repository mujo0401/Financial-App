import { DataTypes, Model } from 'sequelize';
import sequalize from '../services/connectionService.js'; 

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: sequalize, 
  modelName: 'Category',
  tableName: 'category', 
  schema: 'dbo', 
  timestamps: false
});

export default Category;