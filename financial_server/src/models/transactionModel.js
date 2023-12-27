import { DataTypes } from 'sequelize';
import connect from '../services/connectionService.js'; 
import Category from './categoryModel.js'; 
import Description from './descriptionModel.js';

const TransactionDetails = connect.define('TransactionDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  },
  descriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Description,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'TransactionDetails', 
  schema: 'dbo'
});

TransactionDetails.belongsTo(Category, { foreignKey: 'categoryId' }); 
Category.hasMany(TransactionDetails, { foreignKey: 'categoryId' }); 

TransactionDetails.belongsTo(Description, { foreignKey: 'descriptionId' }); 
Description.hasMany(TransactionDetails, { foreignKey: 'descriptionId' });

export default TransactionDetails;
