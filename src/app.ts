import express from 'express';
import path from 'path';
import rootRouter from './routes/index';
import taskRouter from './routes/tasks';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', rootRouter);
app.use('/tasks', taskRouter);

// catch all middleware
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/not-found.html'));
});

export default app;
