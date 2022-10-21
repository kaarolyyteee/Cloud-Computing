import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import { router as authorRouter } from './controller/authorController.js';
import { router as postRouter } from './controller/postController.js';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// available routes
app.use('/api/v1/author', authorRouter);
app.use('/api/v1/post', postRouter);

// other pages return not found
app.all('*', (_, res) => {
    res.status(404);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
