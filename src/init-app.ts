import app from './app';

const port = parseInt(process.env.APP_PORT || '4000');
const host = process.env.APP_HOST_ADDRESS || 'localhost'; 

app.listen(port, host, () => {
    return console.log(`Express is listening at http://${host}:${port}`);
});