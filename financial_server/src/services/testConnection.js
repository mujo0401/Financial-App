import sequelize from "../services/connectionService.js";

const testConnection = async () => {
    await sequelize.authenticate();
    console.log('Completed secure connection to SQL Server');
    const [catresults] = await sequelize.query("SELECT * FROM dbo.category"); 
    console.log('category table:', catresults);
    const [decresults] = await sequelize.query("SELECT * FROM dbo.description"); 
    console.log('description table:', decresults);
    console.log('Successfully connected to financedb');
  } 
export default testConnection;