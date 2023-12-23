import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/connectionService.js'; 

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
  sequelize,
  modelName: 'Transaction'
});

export default Transaction;
