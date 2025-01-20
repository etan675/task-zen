import express from 'express';
import path from 'path';
import rootRouter from './routes/index';
import 'dotenv/config';
import { basePath } from './app-consts';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/api';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import validateUserSession from './middleware/validate-user-session';

const app = express();

app.use(express.static(path.join(basePath, 'public')));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// root routes
app.use('/', rootRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/api', validateUserSession, apiRouter);

// catch all middleware
app.use((req, res) => {
  res.status(404).sendFile(path.join(basePath, '/views/not-found.html'));
});

export default app;
