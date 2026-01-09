import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import { connect } from './app/lib/db.js'

export function createApp() {
    // Load environment variables if needed.
    if (process.env.ENV_LOADED !== '1') {
        process.env.ENV_LOADED = '1';

        const __filename = fileURLToPath(import.meta.url);
        const currentDir = path.dirname(__filename);

        if (process.env.NODE_ENV === 'test') {
            dotenv.config({ path: path.join(currentDir, '/.env.testing') })
        } else {
            dotenv.config({ path: path.join(currentDir, '/.env') })
        }
    }

    const app = express()

    app.get('/up', async (req, res) => {
        try {
            await connect();

            res.send('OK');
        } catch (err) {
            res.status(500).send('NOT OK');
        }
    })

    app.get('/api/quotes', async (req, res) => {
        const db = await connect();
        const result = await db.query('SELECT * from quotes');

        return res.json({
            data: result.rows,
        })
    })

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello, World!',
        })
    })

    return app
}
