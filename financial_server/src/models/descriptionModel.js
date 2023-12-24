import { DataTypes, Model } from 'sequelize';
import sequalize from '../services/connectionService.js'; 

class Description extends Model {}

Description.init({
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
  modelName: 'Description', 
  tableName: 'description',
  schema: 'dbo',
  timestamps: false
});

export default Description;
