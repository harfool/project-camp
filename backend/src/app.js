import express from "express"
import healthRoute from "./routes/healthcheck.route.js"

//route import
const app = express()

// routes 

app.use("/api/v1" , healthRoute)

export default app