import express from 'express';
import path from 'path';
import rootRouter from './routes/index';
import taskRouter from './routes/tasks';
import 'dotenv/config';
import loginRouter from './routes/login';
import { basePath } from './appConsts';
import cookieParser from 'cookie-parser';
import validateUserSession from './middleware/validateUserSession';

const app = express();

app.use(express.static(path.join(basePath, 'public')));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/', rootRouter);
app.use('/tasks', validateUserSession, taskRouter);
app.use('/login', loginRouter);

// catch all middleware
app.use((req, res) => {
  res.status(404).sendFile(path.join(basePath, '/views/not-found.html'));
});

export default app;
