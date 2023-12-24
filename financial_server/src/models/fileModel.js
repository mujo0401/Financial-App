import { DataTypes, Model } from 'sequelize';
import sequalize from '../services/connectionService.js'; 

class File extends Model {}

File.init({
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
    sequelize: sequalize, 
  modelName: 'File'
});

export default File;
