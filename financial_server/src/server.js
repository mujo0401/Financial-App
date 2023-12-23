import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan';
import connect from './services/connectionService.js';
import transactionRoute from './routes/transactionRoute.js';
import categoryRoute from './routes/categoryRoute.js'; 
import descriptionRoute from './routes/descriptionRoute.js'; 
import transactionImportRoute from './routes/transactionImportRoute.js';
import healthRoute from './routes/healthRoute.js';
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
    console.log('Connecting to financedb...');
    await connect.authenticate();
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error(`Could not connect to SQL Server: ${err}`);
    process.exit(1);
  }
};

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static file serving
server.use(express.static(path.join(__dirname, 'public'))); 

// API routes
server.use('/api/dashboard', dashboardRoute);
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

// In your Express server setup:
server.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// React server routing for frontend
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); 
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;