import {
	IOptions,
	ISpecObject,
	IRouteObject,
	IRegisterResult,
	IRouteHandler,
} from "../../interfaces"

import { RouteController } from "."

export class RouteBuilder {
	private app: any
	private options: IOptions
	private data: IRouteObject
	private controller: any

	constructor(data: IRouteObject, options: IOptions, app: any) {
		this.app = app
		this.data = data
		this.options = options
		this.controller = new RouteController(
			this.data.apiName,
			this.data.fileName,
			this.options
		)
	}

	build() {
		let registerResult: Array<IRegisterResult> = []

		const handler: IRouteHandler = this.controller.getHandler()

		const result = this.register(
			this.data.method,
			this.data.url,
			handler.function,
			handler.name
		)

		registerResult.push(result)

		return registerResult
	}

	register(
		method: string,
		url: string,
		handler: any,
		controllerName: string
	): IRegisterResult {
		let status: string = "\x1b[31mFAIL\x1b[0m"
		method = method.toLowerCase()

		try {
			this.app[method](url, handler)
			status = "OK"
		} catch (error) {
			status = "\x1b[31mFAIL\x1b[0m"
		}

		return {
			method: method,
			url: url,
			controller: controllerName,
			status: status,
			protected: false,
			cors: false,
		}
	}
}
