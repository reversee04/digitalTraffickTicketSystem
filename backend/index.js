// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const https = require('https');
const fs = require('fs');
const path = require('path');
const driverRoutes = require('./routes/driverRoutes')
const officerRoutes = require('./routes/officerRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const violationRoutes = require('./routes/violationRoutes')
const paymentRoutes = require('./routes/paymentRoutes')


const app = express();

// Load SSL certificates (only for production)
if (process.env.NODE_ENV === 'production') {
  const key = fs.readFileSync(path.resolve(__dirname, 'path-to-key.pem'));
  const cert = fs.readFileSync(path.resolve(__dirname, 'path-to-cert.pem'));
  const httpsServer = https.createServer({ key, cert }, app);
}


// Security headers
app.use(helmet());

// Limit requests to prevent DoS and brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Cross-Origin Resource Sharing (CORS) configuration
const allowedOrigins = ['https://yourfrontend.com']; 
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  })
);

// Body parser and cookie parser
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Protect against Cross-Site Scripting (XSS)
app.use(xssClean());

// Compress response bodies
app.use(compression());


app.use('/api', driverRoutes);
app.use('/api', officerRoutes);
app.use('/api', ticketRoutes);
app.use('/api', violationRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', paymentRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
