import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/connectionService.js'; 

class Description extends Model {}

Description.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize, 
  modelName: 'Description' 
});

export default Description;
