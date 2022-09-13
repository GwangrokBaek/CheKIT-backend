import * as fs from "fs"
import * as path from "path"
import {
	IOptions,
	IRouteObject,
	ISpecObject,
	IRegisterResult,
	getOptions,
} from "../../interfaces"
import { RouteBuilder, RouteLog } from "."

export class JsonToRoute {
	private router: any
	private options: IOptions

	constructor(router: any, options: IOptions) {
		this.router = router
		this.options = getOptions(options)
	}

	execute(): any {
		let specObjects = this.getSpecObjects()
		let registerResult: Array<IRegisterResult> = []

		for (let spec of specObjects) {
			for (let data of spec.data) {
				let result = new RouteBuilder(
					data,
					this.options,
					this.router
				).build()
				registerResult = [...registerResult, ...result]
			}
		}

		if (this.options.log) {
			this.displayResult(registerResult)
		}
	}

	getSpecObjects(): ISpecObject[] {
		let specObjects: ISpecObject[] = []

		for (const file of this.options.files) {
			try {
				const jsonFile = fs.readFileSync(
					path.join(this.options.directory, file),
					"utf-8"
				)
				const jsonData = JSON.parse(jsonFile)

				specObjects.push({
					file: file,
					data: this.parseSpecFile(file, jsonData),
				})
			} catch (error) {
				if (error instanceof SyntaxError) {
					console.error(
						`[${error.name}] ${error.message} from ${file}`
					)
				} else {
					console.error(`[${error.name}] ${error.message}`)
				}
			}
		}

		return specObjects
	}

	parseSpecFile(file: string, jsonData: object): IRouteObject[] {
		let routeObject: IRouteObject[] = []

		for (const name in jsonData) {
			let tempSpecObjectItem: IRouteObject = {
				fileName: file.replace(".json", ""),
				apiName: name,
				url: jsonData[name].url,
				method: jsonData[name].method,
				description: jsonData[name].description,
				body: jsonData[name].body,
				headers: jsonData[name].headers,
				response: jsonData[name].response,
			}
			routeObject.push(tempSpecObjectItem)
		}

		return routeObject
	}

	displayResult(registerResult: Array<IRegisterResult>) {
		new RouteLog(registerResult)
	}
}
