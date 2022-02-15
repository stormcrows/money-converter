import app from "./app"
import http from "http"

const port = Number(process.env.PORT || "3000")
app.set("port", port)

const server = http.createServer(app)

server.on("error", console.error)
server.on("listening", () => console.log(`listening on port ${port}`))

server.listen(port)
