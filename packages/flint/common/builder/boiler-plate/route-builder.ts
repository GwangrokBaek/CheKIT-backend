import * as fs from "fs"
import { RouteFactory } from "./route-factory"

export type specObjectType = {
	file: string
	data: routeObjectType[]
}

export type routeObjectType = {
	fileName?: string
	apiName?: string
	url?: string
	method?: string
	description?: string
	params?: string
	query?: string
	body?: any
	headers?: any
	response?: any
}

export class RouteBuilder {
	private specFiles: string[] = []
	private specObjects: specObjectType[] = []

	constructor() {}

	public getSpecObjects(): specObjectType[] {
		return this.specObjects
	}

	public setSpecFiles(files: string[]): RouteBuilder {
		this.specFiles = files
		return this
	}

	public parseSpecFiles(): RouteBuilder {
		for (const file of this.specFiles) {
			try {
				const jsonFile = fs.readFileSync(file, "utf-8")
				const jsonData = JSON.parse(jsonFile)
				let routeObject: routeObjectType[] = []

				for (const name in jsonData) {
					let tempSpecObjectItem: routeObjectType = {
						fileName: file.replace(/\.[^/.]+$/, ""),
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
				this.specObjects.push({ file: file, data: routeObject })
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

		return this
	}

	public build(): RouteBuilder {
		for (const spec of this.specObjects) {
			this.buildController(spec)
			this.buildService(spec)
		}
		return this
	}

	public buildController(spec: specObjectType): void {
		try {
			let specFileName = spec.file.replace(/\.[^/.]+$/, "")
			let writeFileName = `${specFileName}.controller.ts`
			let className = `${
				specFileName[0].toUpperCase() + specFileName.slice(1)
			}`

			if (fs.existsSync(writeFileName)) {
			} else {
				let fileContent = ""

				fileContent += RouteFactory.create("import", {
					list: ["Controller", "Get", "Post", "Header"],
					package: "flint/common",
				}).makeContent()
				fileContent += RouteFactory.create("import", {
					list: [`${className}Service`],
					package: `./${specFileName}.service`,
				}).makeContent()
				fileContent += RouteFactory.create("import", {
					list: [`email`],
					package: `../../../common/type/emailType`,
				}).makeContent()
				fileContent += "\n"

				fileContent += RouteFactory.create("decorator", {
					decorator: "Controller",
				}).makeContent()
				fileContent += RouteFactory.create("class", {
					className: `${className}Controller`,
				}).makeContent()
				fileContent += `\tconstructor(private readonly ${specFileName}Service: ${className}Service) {}\n`

				fileContent += spec.data
					.map((element) => {
						return RouteFactory.create(
							`${element.method}`,
							element
						).makeContent()
					})
					.join("\n")

				fileContent += "\n}\n"

				fs.appendFileSync(writeFileName, fileContent, "utf-8")
			}
		} catch (error) {
			console.error(`[${error.name}] ${error.message}`)
		}
	}

	public buildService(spec: specObjectType): void {
		try {
			let specFileName = spec.file.replace(/\.[^/.]+$/, "")
			let writeFileName = `${specFileName}.service.ts`
			let className = `${
				specFileName[0].toUpperCase() + specFileName.slice(1)
			}`

			if (fs.existsSync(writeFileName)) {
			} else {
				let fileContent = ""

				fileContent += RouteFactory.create("import", {
					list: ["Injectable"],
					package: "flint/common",
				}).makeContent()
				fileContent += RouteFactory.create("import", {
					list: [`email`],
					package: `../../../common/type/emailType`,
				}).makeContent()
				fileContent += "\n"

				fileContent += RouteFactory.create("decorator", {
					decorator: "Injectable",
				}).makeContent()
				fileContent += RouteFactory.create("class", {
					className: `${className}Service`,
				}).makeContent()

				fileContent += spec.data
					.map((element) => {
						return RouteFactory.create(
							"function",
							element
						).makeContent()
					})
					.join("\n")

				fileContent += "\n}\n"

				fs.appendFileSync(writeFileName, fileContent, "utf-8")
			}
		} catch (error) {
			console.error(`[${error.name}] ${error.message}`)
		}
	}
}
