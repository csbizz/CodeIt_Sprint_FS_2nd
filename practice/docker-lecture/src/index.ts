import express, { type Request, type Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, TypeScript with Express!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
