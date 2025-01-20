import app from './app';
// import 'dotenv/config';

const port = process.env.APP_PORT;

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});