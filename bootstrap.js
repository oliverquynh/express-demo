import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

import { router } from './routes.js'

function loadEnvironmentVariables() {
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
}

export function createApp() {
    // Load environment variables if needed.
    loadEnvironmentVariables();

    const app = express()

    app.use('/', router)

    return app
}
