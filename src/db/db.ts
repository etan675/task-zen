import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;

const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ...(process.env.NODE_ENV === 'production' ? {
        // required for security to connect to db instance hosted on neon
        ssl: { rejectUnauthorized: false }
    } : {}) 
});

export default db;