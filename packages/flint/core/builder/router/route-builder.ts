import {
	IOptions,
	ISpecObject,
	IRouteObject,
	IRegisterResult,
} from "./interfaces"

export class RouteBuilder {
	private app: any
	private options: IOptions
	private data: IRouteObject
	private controller: any

	constructor(data: IRouteObject, options: IOptions, app: any) {
		this.app = app
		this.data = data
		this.options = options
		this.controller = ""
	}

	build() {
		let registerResult: Array<IRegisterResult> = []

		const result = this.register(
			this.data.method,
			this.data.url,
			(req, res) => {
				res.send("hi")
			}
		)

		registerResult.push(result)

		return registerResult
	}

	register(method: string, url: string, handler: any): IRegisterResult {
		let status: string
		method = method.toLowerCase()

		try {
			this.app[method](url, handler)
			status = "OK"
		} catch (error) {
			console.error(error)
			status = "\x1b[31mFail\x1b[0m"
		}

		return {
			method: method,
			url: url,
			controller: "",
			status: status,
			protected: false,
			cors: false,
		}
	}
}
