import express from 'express';
import Router from './routers/index.js';

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', Router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
