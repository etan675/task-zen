import express from 'express';
import path from 'path';
import rootRouter from './routes/index';
import taskRouter from './routes/tasks';
import 'dotenv/config';
import { loginRouter } from './routes/login';
import { basePath } from './appConsts';
const app = express();

app.use(express.static(path.join(basePath, 'public')));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', rootRouter);
app.use('/tasks', taskRouter);
app.use('/login', loginRouter);

// catch all middleware
app.use((req, res) => {
  res.status(404).sendFile(path.join(basePath, 'public/not-found.html'));
});

export default app;
