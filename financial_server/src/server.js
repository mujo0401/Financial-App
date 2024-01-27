import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import WebSocket, { WebSocketServer } from 'ws';
import { createServer } from 'http';
import morgan from 'morgan';
import HealthRoute from './routes/healthRoute.js';
import testConnection from './services/testConnection.js';
import TransactionEntryRoute from './routes/transactionEntryRoute.js';
import CategoryRoute from './routes/categoryRoute.js'; 
import DescriptionRoute from './routes/descriptionRoute.js'; 
import FileRoute from './routes/fileRoute.js'
import TransactionImportRoute from './routes/transactionImportRoute.js';
import DashboardRoute from './routes/dashboardRoute.js';
import MappingRoute from './routes/mappingRoute.js';
import MessageRoute from './routes/messageRoute.js';


const server = express();
const connect = createServer(server);
const wss = new WebSocketServer({ noServer: true });

const connectionAttempts = new Map();

wss.on('connection', (ws) => {
  console.log('A user connected');

  ws.on('message', (message) => {
    console.log('Message received:', message);

    // Broadcast the message to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A user disconnected');
  });
});

connect.on('upgrade', (request, socket, head) => {
  const ip = request.socket.remoteAddress;

  // Increment the number of connection attempts from this IP
  connectionAttempts.set(ip, (connectionAttempts.get(ip) || 0) + 1);

  // If the IP has made too many connection attempts, close the connection
  if (connectionAttempts.get(ip) > 100) {
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Reset the connection attempts every 15 minutes
setInterval(() => {
  connectionAttempts.clear();
}, 15 * 60 * 1000);
;

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
server.use('/api/health', HealthRoute);
server.use('/api/dashboard', DashboardRoute);
server.use('/api/mapping', MappingRoute);
server.use('/api/categories', CategoryRoute);
server.use('/api/descriptions', DescriptionRoute);
server.use('/api/files', FileRoute); 
server.use('/api/transactions', TransactionEntryRoute);
server.use('/api/imports', TransactionImportRoute);
server.use('/api/messages', MessageRoute);

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