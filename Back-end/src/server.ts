import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions';

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});