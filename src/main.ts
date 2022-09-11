import * as express from "express"
// import ApiRouter from "./routes/index"
// import TestRouter from "./routes/decoratorTest"
import { AppModule } from "./modules/app.module"

export const app = express()

// app.use("/", new ApiRouter().router)
// new TestRouter()

new AppModule()

app.listen(3000, () => {
	console.log("Server listening on port : 3000")
}).on("error", (error) => {
	console.error(error)
})
