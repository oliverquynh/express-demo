import { Client } from 'pg'

let globalClient;

export async function connect() {
    if (!globalClient) {
        globalClient = new Client({
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            database: process.env.POSTGRES_DATABASE,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
        })

        await globalClient.connect();
    }

    return globalClient;
}
