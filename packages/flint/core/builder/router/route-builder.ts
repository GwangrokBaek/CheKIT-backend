import {
	IOptions,
	ISpecObject,
	IRouteObject,
	IRegisterResult,
	IRouteHandler,
} from "../../interfaces"

import { RouteController, RouteMiddleware } from "."

export class RouteBuilder {
	private router: any
	private options: IOptions
	private data: IRouteObject
	private controller: any
	private logger: any

	constructor(
		data: IRouteObject,
		options: IOptions,
		router: any,
		logger: any
	) {
		this.router = router
		this.data = data
		this.options = options
		this.controller = new RouteController(
			this.data.apiName,
			this.data.fileName,
			this.options
		)
		this.logger = logger
	}

	build() {
		let registerResult: Array<IRegisterResult> = []
		let jwt: boolean = this.parseHeaders(this.data.headers)

		const handler: IRouteHandler = this.controller.getHandler()
		const middleware = new RouteMiddleware(
			this.options,
			this.data,
			this.logger
		).getMiddleware(jwt)

		const result = this.register(
			this.data.method,
			this.data.url,
			jwt,
			middleware,
			handler.function,
			handler.name
		)

		registerResult.push(result)

		return registerResult
	}

	register(
		method: string,
		url: string,
		jwt: boolean,
		middleware: Array<any>,
		handler: any,
		controllerName: string
	): IRegisterResult {
		let status: string = "\x1b[31mFAIL\x1b[0m"
		method = method.toLowerCase()

		try {
			if (handler === undefined) {
				throw new Error(`${controllerName} doesn't exist`)
			}

			if (middleware.length !== 0) {
				this.router[method](
					`${this.options.prefix}${url}`,
					middleware,
					async (req, res) => {
						const result = await handler(req, res)
						res.json(result)
					}
				)
			} else {
				this.router[method](
					`${this.options.prefix}${url}`,
					async (req, res) => {
						const result = await handler(req, res)
						res.json(result)
					}
				)
			}

			status = "OK"
		} catch (error) {
			status = "\x1b[31mFAIL\x1b[0m"
		}

		return {
			method: method,
			url: url,
			controller: controllerName,
			status: status,
			protected: jwt,
			cors: false,
		}
	}

	parseHeaders(headers: any): boolean {
		let hasJwt: boolean = false

		if (headers && headers.Authorization) {
			if (headers.Authorization.required) {
				hasJwt = true
			}
		}

		return hasJwt
	}
}
