import { Sequelize } from 'sequelize';
import tedious from 'tedious';

const host = 'localhost\\SQLEXPRESS01';
const database = 'financedb';
const driver = 'ODBC Driver 18 for SQL Server';
const timeout = '30';
const trust_connection = 'Trusted_Connection=yes';

const SQL_SERVER_URI = `mssql://${host}/${database}?driver=${driver}&TrustServerCertificate=yes&Connection+Timeout=${timeout}&${trust_connection}`;


const connect = new Sequelize(SQL_SERVER_URI, {
  dialect: 'mssql',
  dialectModule: tedious
});

export default connect;
