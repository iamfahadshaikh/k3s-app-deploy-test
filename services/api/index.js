const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const IORedis = require('ioredis');


const app = express();
app.use(bodyParser.json());


const pool = new Pool({
host: process.env.POSTGRES_HOST || 'postgres',
user: process.env.POSTGRES_USER || 'postgres',
password: process.env.POSTGRES_PASSWORD || 'postgrespw',
database: process.env.POSTGRES_DB || 'appdb',
port: 5432
});


const redis = new IORedis({ host: process.env.REDIS_HOST || 'redis' });


app.get('/healthz', (req, res) => res.send('ok'));


app.get('/items', async (req, res) => {
const { rows } = await pool.query('SELECT id, payload, processed FROM items ORDER BY id DESC LIMIT 100');
res.json(rows);
});


app.post('/items', async (req, res) => {
const payload = req.body.payload || 'empty';
const insert = await pool.query('INSERT INTO items(payload, processed) VALUES($1,false) RETURNING id', [payload]);
const id = insert.rows[0].id;
await redis.lpush('queue:items', JSON.stringify({ id, payload }));
res.json({ id });
});


const port = process.env.PORT || 3000;
app.listen(port, async () => {
// create table if missing
await pool.query(`CREATE TABLE IF NOT EXISTS items (
id SERIAL PRIMARY KEY,
payload TEXT,
processed BOOLEAN DEFAULT false,
processed_at TIMESTAMP NULL
)`);
console.log('api running on', port);
});
