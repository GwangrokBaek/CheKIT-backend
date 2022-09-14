import { Module } from "../../packages/flint/common"
import { ApiRouter } from "../routes/api.router"
import { ApiController } from "../controllers/api.controller"
import { Logger } from "../../packages/flint/common"

@Module()
export class AppModule {
	public imports: any[]
	public routers: any[]
	public providers: any[]

	constructor() {
		const logger = new Logger("warn")
		const apiController = new ApiController(logger)
		const apiRouter = new ApiRouter(apiController, logger)

		this.imports = []
		this.routers = [apiRouter]
		this.providers = [apiController]
	}
}
