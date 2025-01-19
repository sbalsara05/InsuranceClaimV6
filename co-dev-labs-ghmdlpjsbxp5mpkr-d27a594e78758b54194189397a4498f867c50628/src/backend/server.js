import express from "express" 
import cors from "cors"
import claims from "../components/pages/api/claims.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/claims.js") // place holder this needs to be updated with a new API 
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app



