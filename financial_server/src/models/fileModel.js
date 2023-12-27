import { DataTypes } from 'sequelize';
import connect from '../services/connectionService.js'; 

const File = connect.define('Fild', {
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileSize: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  importDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fileHash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mediaType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  encoding: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isProcessed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'File', 
  schema: 'dbo', 
  timestamps: false
});

export default File;
