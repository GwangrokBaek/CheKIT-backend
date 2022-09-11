import { IOptions, IRouteHandler } from "./interfaces"
import * as path from "path"

export class RouteController {
	apiName: string
	controllerFileName: string
	options: IOptions

	constructor(routeName: string, fileName: string, options: IOptions) {
		this.options = options
		this.apiName = routeName
		this.controllerFileName = this.getControllerFileName(fileName)
	}

	getControllerFileName(specFileName: string): string {
		return `${specFileName}.controller.ts`
	}

	getHandler(): IRouteHandler {
		let basePath: string = path.join(
			this.options.directory,
			"../controllers"
		)

		let controller: any = require(path.join(
			basePath,
			this.controllerFileName
		))

		return { function: controller[this.apiName], name: this.apiName }
	}
}
