import "reflect-metadata"
import * as express from "express"
import { ROUTER_METADATA, JSON_TO_ROUTER_METADATA } from "../common/constants"
import { JsonToRoute } from "../core"
import { Logger } from "../common"
import * as bodyParser from "body-parser"

class FlintInitializer {
	private logger: any = new Logger("error", "Flint")
	static app

	create(modules: any[]): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.logger.info("Start to initialize Flint")
			FlintInitializer.app = express()
			FlintInitializer.app.use(bodyParser.json())

			const expressRouter = express.Router()

			for (module of modules) {
				const routers = module["routers"]
				const providers = module["providers"]

				for (const router of routers) {
					this.logger.info(
						`Registring routers of ${module.constructor.name} ...`
					)
					this.setRouter(router, expressRouter)
					this.logger.info(`Registration of routers is completed`)
				}
			}

			this.logger.info("Successfully Initialized Flint")
			resolve(FlintInitializer.app)
		})
	}

	setRouter(router: any, expressRouter: any): void {
		const routerMetadata = Reflect.getMetadata(
			ROUTER_METADATA,
			router.constructor
		)
		const jsonToRouterMetadata = Reflect.getMetadata(
			JSON_TO_ROUTER_METADATA,
			router.constructor
		)

		for (const apiName in routerMetadata) {
			const api = routerMetadata[apiName]

			expressRouter[api.method](api.path, (req, res) => {
				const result = router[apiName](req, res)
				res.json(result)
			})
		}

		if (jsonToRouterMetadata) {
			jsonToRouterMetadata.options.prefix = jsonToRouterMetadata.prefix
			new JsonToRoute(
				expressRouter,
				jsonToRouterMetadata.options
			).execute()
		}

		FlintInitializer.app.use("/", expressRouter)
	}
}

export const Flint = new FlintInitializer()
