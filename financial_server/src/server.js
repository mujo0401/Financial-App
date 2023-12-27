import express from 'express';
import cors from 'cors';

import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan';
import testConnection from './services/testConnection.js';
import transactionRoute from './routes/transactionRoute.js';
import categoryRoute from './routes/categoryRoute.js'; 
import descriptionRoute from './routes/descriptionRoute.js'; 
import transactionImportRoute from './routes/transactionImportRoute.js';
import dashboardRoute from './routes/dashboardRoute.js';

const server = express();

server.use(cors({
  origin: `*`
}));

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    await testConnection();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Could not connect to SQL Server: ${err}`);
  }
};

connectDB();

const connectionStatus = async () => {
  let status = 'OK';
  try {
    await testConnection(); // Test the database connection
  } catch (error) {
    console.error('Database connection failed:', error);
    status = 'Database connection failed';
  }
  return status;
};

// Modify the health route to use connectionStatus for on-demand checks
server.get('/api/health', async (req, res) => {
  const dbStatus = await connectionStatus();
  if (dbStatus === 'OK') {
    res.send('API and Database are healthy');
  } else {
    res.status(500).send(dbStatus); // Send the error status
  }
});

// Periodically check the health and log the status
const PING_INTERVAL = 1000 * 30; // every 30 seconds
setInterval(async () => {
  const status = await connectionStatus();
  if (status !== 'OK') {
    console.error('Health check failed:', status);
  } else {
  }
}, PING_INTERVAL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// React server routing for frontend
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); 
});

export default server;