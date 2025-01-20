import express from "express"
import cors from "cors"
import claims from "./routes/claims.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/claims.js") // place holder this needs to be updated with a new API
app.use("/api/v1/claims", claims)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
export default app



