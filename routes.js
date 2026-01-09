import express from 'express'
import { connect } from './app/lib/db.js'

export const router = express.Router()

router.get('/up', async (req, res) => {
    try {
        await connect();

        res.send('OK');
    } catch (err) {
        res.status(500).send('NOT OK');
    }
})

router.get('/hello', async (req, res) => {
    res.json({
        message: 'Hello',
    })
})

router.get('/api/quotes', async (req, res) => {
    const db = await connect();
    const result = await db.query('SELECT * from quotes');

    return res.json({
        data: result.rows,
    })
})
