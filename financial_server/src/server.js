import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan';
import healthRoute from './routes/healthRoute.js';
import testConnection from './services/testConnection.js';
import transactionRoute from './routes/transactionRoute.js';
import categoryRoute from './routes/categoryRoute.js'; 
import descriptionRoute from './routes/descriptionRoute.js'; 
import transactionImportRoute from './routes/transactionImportRoute.js';
import dashboardRoute from './routes/dashboardRoute.js';
import mappingRoute from './routes/mappingRoute.js';


const server = express();

server.use(cors({
  origin: `*`
}));

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const PING_INTERVAL = 1000 * 60 * 5 

const connectDB = async () => {
  try {
    await testConnection();
    console.log('Connection to the database has been established successfully.');
    server.listen(PORT, () => {
      console.log(`Server has connected to port ${PORT}`);
    });

    setInterval(async () => {
      try {
        await testConnection();
      } catch (error) {
        console.error('Periodic health check failed:', error);
      }
    }, PING_INTERVAL);

  } catch (error) {
    console.error(`Could not connect to SQL Server: ${error}`);
    process.exit(1);
  }
};

server.get('/api/health', async (req, res) => {
  try {
    await testConnection(); 
    res.send('OK'); 
  } catch (error) {
    console.error('Health check endpoint encountered an error:', error);
    res.status(500).send('Service Unavailable'); 
  }
});

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static file serving
server.use(express.static(path.join(__dirname, 'public'))); 

// API routes
server.use('/api/dashboard', dashboardRoute);
server.use('/api/mapping', mappingRoute);
server.use('/api/categories', categoryRoute);
server.use('/api/descriptions', descriptionRoute);
server.use('/api/transactions', transactionRoute);
server.use('/api/files', transactionImportRoute); 
server.use('/api/health', healthRoute);

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// React server routing for frontend
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); 
});

export default server;