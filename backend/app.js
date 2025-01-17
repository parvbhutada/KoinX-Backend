import express from 'express';
import * as cryptoController from './controllers/crypto.controller.js';
import connect from './db.js';
import * as cronFunctions from './cron.js';

connect();
const app = express();
app.use(express.json());

cronFunctions.startJob();
cronFunctions.scheduleJob();

app.get('/stats', cryptoController.statsController);

app.get('/deviation', cryptoController.deviationController);

export default app;