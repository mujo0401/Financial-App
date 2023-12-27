import { DataTypes } from 'sequelize';
import connect from '../services/connectionService.js'; 

const Category = connect.define('Category', {
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
  tableName: 'Category', 
  schema: 'dbo', 
  timestamps: false
});

export default Category;
