import app from './app';

const port = process.env.APP_PORT;

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});