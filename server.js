import { createApp } from "./bootstrap.js"

const app = createApp();

const port = process.env.APP_PORT || 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
