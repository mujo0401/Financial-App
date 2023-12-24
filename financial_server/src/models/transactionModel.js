import { DataTypes, Model } from 'sequelize';
import sequalize from '../services/connectionService.js'; 
import Category from './categoryModel.js'; 
import Description from './descriptionModel.js';

class Transaction extends Model {}

Transaction.init({
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  descriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Descriptions', 
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
  sequelize: sequalize, 
  modelName: 'Transaction',
  tableName: 'transaction', 
  schema: 'dbo'
});

Transaction.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' }); 
Category.hasMany(Transaction, { as: 'category', foreignKey: 'categoryId' }); 

Transaction.belongsTo(Description, {as: 'description', foreignKey: 'descriptionId' }); 
Description.hasMany(Transaction, { as: 'description', foreignKey: 'descriptionId' });

export default Transaction;