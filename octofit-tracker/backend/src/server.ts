import express from 'express';
import mongoose from 'mongoose';

import apiRouter from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});

mongoose
  .connect(connectionString)
  .then(() => console.log('Connected to octofit_db'))
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`MongoDB unavailable; API is running without persistence: ${message}`);
  });
