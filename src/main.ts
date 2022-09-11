import * as express from "express"
// import ApiRouter from "./routes/index"
import TestRouter from "./routes/decoratorTest"

export const app = express()

// app.use("/", new ApiRouter().router)
new TestRouter()

app.listen(3000, () => {
	console.log("Server listening on port : 3000")
}).on("error", (error) => {
	console.error(error)
})
