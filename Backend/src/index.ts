import express from "express"
import UserRouter from "./routes/UserRoute"
import ContentRoute from "./routes/ContentRoute"
import ShareRoute from "./routes/ShareRoute"
const app = express()
app.use(express.json())

app.use("/api/v1/user", UserRouter)
app.use("/api/v1/content", ContentRoute)
app.use("/api/v1/brain", ShareRoute)

app.listen(3000)