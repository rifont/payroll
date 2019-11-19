import '@babel/polyfill';
import express from 'express';
import logger from './logger';
import morgan from 'morgan';
import path from 'path';

import payslipRoute from './routes/payslip.route';

const app = express();

// Body Parser Middleware
app.use(
  express.json({
    verify(req, res, buffer) {
      req.rawBody = buffer.toString();
    },
  })
);

// Routes
app.use('/api/payslip', payslipRoute);

// HTTP Logger
app.use(
  morgan('tiny', { stream: { write: message => logger.info(message.trim()) } })
);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server started on port ${PORT}...`));
