import { IOptions, IRouteHandler } from "../../interfaces"
import * as path from "path"

export class RouteController {
	apiName: string
	controllerFileName: string
	options: IOptions
	controllerName: string

	constructor(routeName: string, fileName: string, options: IOptions) {
		this.options = options
		this.apiName = routeName
		this.controllerFileName = this.getControllerFileName(fileName)
		this.controllerName = `${
			this.controllerFileName.charAt(0).toUpperCase() +
			this.controllerFileName.replace(".controller.ts", "").slice(1)
		}Controller`
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

		return {
			function: controller[this.controllerName][this.apiName],
			name: this.apiName,
		}
	}
}
