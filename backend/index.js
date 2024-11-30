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
const multer = require('multer');
const { spawn } = require('child_process');

const driverRoutes = require('./routes/driverRoutes');
const officerRoutes = require('./routes/officerRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const violationRoutes = require('./routes/violationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

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
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Cross-Origin Resource Sharing (CORS) configuration
const allowedOrigins = ['https://yourfrontend.com']; // Replace with your frontend URL
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

// Register routes
app.use('/api', driverRoutes);
app.use('/api', officerRoutes);
app.use('/api', ticketRoutes);
app.use('/api', violationRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', paymentRoutes);

// Set up file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/process-image', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;
  console.log('Image Path:', imagePath);

  if (fs.existsSync(imagePath)) {
    let responseSent = false;

    try {
      // Spawn Python script
      const pythonProcess = spawn('python', [
        path.resolve(__dirname, './vision/number_plate.py'),
        imagePath,
      ]);

      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
        console.log("Python Output:", data.toString());
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.log("Python Error:", data.toString());
      });

      pythonProcess.on('close', (code) => {
        // Ensure the response is only sent once
        if (!responseSent) {
          responseSent = true;

          if (code === 0) {
            res.json({ text: output.trim() || 'No text detected.' });
          } else {
            console.error('Python Script Error:', errorOutput);
            res.status(500).json({ error: 'Error processing the image.', details: errorOutput.trim() });
          }

          // Delete the file after sending the response
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log('File deleted after processing');
          }
        }
      });

      setTimeout(() => {
        if (!responseSent) {
          responseSent = true;
          pythonProcess.kill();
          res.status(500).json({ error: 'Processing timeout. Please try again later.' });

          // Delete the file if processing times out
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      }, 10000);  // 10 seconds timeout

    } catch (error) {
      console.error('Error:', error.message);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Clean up uploaded file if an error occurs
      }
      if (!responseSent) {
        responseSent = true;
        res.status(500).json({ error: 'Error processing the image.', details: error.message });
      }
    }
  } else {
    console.log('File not found:', imagePath);
    if (!responseSent) {
      responseSent = true;
      res.status(400).json({ error: 'File not found after upload.' });
    }
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
