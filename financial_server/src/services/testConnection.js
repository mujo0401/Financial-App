import connect from "../services/connectionService.js";

const testConnection = async () => {
    await connect.authenticate();
    console.log('Completed secure connection to SQL Server');
    const [catresults] = await connect.query("SELECT * FROM dbo.Category"); 
    console.log('Category table:', catresults);
    const [decresults] = await connect.query("SELECT * FROM dbo.Description"); 
    console.log('Description table:', decresults);
    console.log('Successfully connected to financedb');
  } 

  const pingDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
export default testConnection;