import sequelize from "../services/connectionService.js";

const testConnection = async () => {
    await sequelize.authenticate();
    console.log('Completed secure connection to SQL Server');
  } 
  
export default testConnection;