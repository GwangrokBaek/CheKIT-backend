import { Module } from "../../packages/flint/common"
import { ApiRouter } from "../routes/api.router"
import { ApiController } from "../controllers/api.controller"
import { Logger } from "../../packages/flint/common"
import { AppDB } from "./app.db"
import { User } from "../models/user.model"
import { Doctor } from "../models/doctor.model"

@Module()
export class AppModule {
	public imports: any[]
	public routers: any[]
	public providers: any[]

	constructor() {
		const logger = new Logger("error")
		const appDb = new AppDB(logger)
		const apiController = new ApiController(logger, User, Doctor)
		const apiRouter = new ApiRouter(apiController)

		this.imports = []
		this.routers = [apiRouter]
		this.providers = [apiController, appDb]
	}
}
