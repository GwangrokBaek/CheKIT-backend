import "reflect-metadata"
import * as express from "express"
import { ROUTER_METADATA } from "../common/constants"

class FlintInitializer {
	static app

	create(modules: any[]): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			FlintInitializer.app = express()

			for (module of modules) {
				this.injectProviders(module)

				const router = Reflect.getMetadata(ROUTER_METADATA, module)
				FlintInitializer.app.use("/", router)
			}

			resolve(FlintInitializer.app)
		})
	}

	injectProviders(module: any) {
		console.log(module)
	}
}

export const Flint = new FlintInitializer()
