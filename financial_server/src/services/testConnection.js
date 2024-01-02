import connect from "../services/connectionService.js";

const testConnection = async () => {
    await connect.authenticate();
    console.log('Completed secure connection to SQL Server');
  } 
  
export default testConnection;