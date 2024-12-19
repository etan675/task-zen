import express from 'express';
import path from 'path';
import rootRouter from './routes/index';
import taskRouter from './routes/tasks';

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
