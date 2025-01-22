import express from 'express';
import path from 'path';
import 'dotenv/config';
import { basePath } from './app-consts';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/api';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import validateUserSession from './middleware/validate-user-session';
import rootRouter from './routes/pages';
import signupRouter from './routes/signup';
import taskPageRouter from './routes/pages/tasks-page';
import loginPageRouter from './routes/pages/login-page';
import signupPageRouter from './routes/pages/signup-page';

const app = express();

app.use(express.static(path.join(basePath, 'public')));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// root routes
app.use('/', rootRouter);
app.use('/tasks', validateUserSession, taskPageRouter);
app.use('/login', loginPageRouter);
app.use('/signup', signupPageRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/api', validateUserSession, apiRouter);

// catch all middleware
app.use((req, res) => {
  res.status(404).sendFile(path.join(basePath, '/views/not-found.html'));
});

export default app;
