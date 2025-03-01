import app from "../backend/server.js"
import mongodb from "mongodb"

const MongoClient = mongodb.MongoClient

const mongo_password = process.env["MONGO_PASSWORD"]
const uri = `mongodb+srv://ramseysalem:${mongo_password}@cluster0.9qkjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 75,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await import("./dao/claimsDAO.js").then(({ injectDB }) => injectDB(client))
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})


