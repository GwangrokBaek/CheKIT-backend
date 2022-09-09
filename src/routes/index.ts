import * as express from "express"
import { JsonToRoute } from "../../packages/flint/core/builder/router"
import { app } from "../main"

class ApiRouter {
	router: any

	constructor() {
		this.router = express.Router()
		new JsonToRoute(app, {
			files: ["api.json", "sample.json"],
			cors: true,
			directory: __dirname,
			log: true,
		}).execute()

		this.set()
	}

	set() {
		this.router.use("/test", (req, res) => {
			console.log("hi")
			res.send("test")
		})
	}
}

export default ApiRouter
