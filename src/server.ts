import express from 'express';
import routes from './routes/index';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (request, response) => {
  response.json({ message: 'OK' });
});

app.listen(PORT, () => console.log(`Server running ${PORT}`));
