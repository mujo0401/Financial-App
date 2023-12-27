import { Sequelize } from 'sequelize';

import tedious from 'tedious';

const database = 'financedb';
const user = 'sa';
const password = 'password'; 


const connect = new Sequelize(database, user, password, {
  host: 'localhost', 
  dialect: 'mssql',
  logging: console.log,
  dialectModule: tedious,
  dialectOptions: {
    options: {
      trustServerCertificate: true,
      integratedSecurity: true, 
    },
    instanceName: 'SQLEXPRESS01',
  },
});

export default connect;
