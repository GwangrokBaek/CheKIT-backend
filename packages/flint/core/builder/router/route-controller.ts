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
		let controller: any = this.options.controller

		return {
			function: controller[this.apiName].bind(controller),
			name: this.apiName,
		}
	}
}
