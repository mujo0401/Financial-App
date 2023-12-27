import { DataTypes } from 'sequelize';
import connect from '../services/connectionService.js'; 

const Description = connect.define('Description', {
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
  tableName: 'Description', 
  schema: 'dbo', 
  timestamps: false
});

export default Description;