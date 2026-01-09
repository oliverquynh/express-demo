import express from 'express'

export function createApp() {
    const app = express()

    app.get('/up', (req, res) => {

    })

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello, World!',
        })
    })

    return app
}
