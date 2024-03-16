import express from 'express';
import cors from 'cors';
import classRoute from './api/class.route.js';
import universityRoute from './api/university.route.js';
import questionRoute from './api/questions.route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/', classRoute);
app.use('/api/v1/', universityRoute);
app.use('/api/v1/questions', questionRoute);

app.use('*', (req, res) => {
  res.status(404).json({ error: 'not found' });
});

export default app;
