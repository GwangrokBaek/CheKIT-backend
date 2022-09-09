class Get {
	private options: any

	constructor(options: any) {
		this.options = options
	}

	public makeContent(): string {
		let content = "\n"
		if (this.options.description) {
			content += `\t// ${this.options.description}\n`
		}
		content += `\t@Get('${this.options.url}')\n`
		content += `\t${this.options.apiName}(\n`
		if (this.options.headers) {
			for (const key in this.options.headers) {
				content += `\t\t@Header('${key.toLowerCase()}') ${key.toLowerCase()}: ${
					this.options.headers[key].type
				},\n`
			}
		}
		if (this.options.params) {
			content += `\t\t`
		}
		if (this.options.query) {
			content += `\t\t`
		}
		content += `\t) {\n`
		content += `\t\treturn this.${this.options.fileName}Service.${this.options.apiName}(`

		let parameters = []

		if (this.options.headers) {
			parameters.push(...Object.keys(this.options.headers))
		}
		if (this.options.params) {
			parameters.push(...Object.keys(this.options.params))
		}
		if (this.options.query) {
			parameters.push(...Object.keys(this.options.query))
		}
		if (parameters.length !== 0) {
			content += parameters.join(", ").toLowerCase()
		}

		content += `)\n`
		content += "\t}"

		return content
	}
}

class Post {
	private options: any

	constructor(options: any) {
		this.options = options
	}

	public makeContent(): string {
		let content = "\n"
		if (this.options.description) {
			content += `\t// ${this.options.description}\n`
		}
		content += `\t@Post('${this.options.url}')\n`
		content += `\t${this.options.apiName}(\n`
		if (this.options.headers) {
			for (const key in this.options.headers) {
				content += `\t\t@Header('${key.toLowerCase()}') ${key.toLowerCase()}: ${
					this.options.headers[key].type
				},\n`
			}
		}
		if (this.options.params) {
			content += `\t\t`
		}
		if (this.options.query) {
			content += `\t\t`
		}
		if (this.options.body) {
			for (const key in this.options.body) {
				content += `\t\t@Body('${key.toLowerCase()}') ${key.toLowerCase()}: ${
					this.options.body[key].type
				},\n`
			}
		}
		content += `\t) {\n`
		content += `\t\treturn this.${this.options.fileName}Service.${this.options.apiName}(`

		let parameters = []

		if (this.options.headers) {
			parameters.push(...Object.keys(this.options.headers))
		}
		if (this.options.params) {
			parameters.push(...Object.keys(this.options.params))
		}
		if (this.options.query) {
			parameters.push(...Object.keys(this.options.query))
		}
		if (this.options.body) {
			parameters.push(...Object.keys(this.options.body))
		}
		if (parameters.length !== 0) {
			content += parameters.join(", ").toLowerCase()
		}

		content += `)\n`
		content += "\t}"

		return content
	}
}

class Import {
	private options: any

	constructor(options: any) {
		this.options = options
	}

	public makeContent(): string {
		let content = ""
		content += `import { ${this.options.list.join(", ")} } from "${
			this.options.package
		}"\n`

		return content
	}
}

class Decorator {
	private options: any

	constructor(options: any) {
		this.options = options
	}

	public makeContent(): string {
		let content = ""
		content += `@${this.options.decorator}()\n`
		return content
	}
}

class Class {
	private options: any

	constructor(options: any) {
		this.options = options
	}

	public makeContent(): string {
		let content = ""
		content += `export class ${this.options.className} {\n`
		return content
	}
}

class ServiceFunction {
	private options: any

	constructor(options: any) {
		this.options = options
	}

	public makeContent(): string {
		let content = "\n"
		if (this.options.description) {
			content += `\t// ${this.options.description}\n`
		}

		content += `\tpublic ${this.options.apiName} (\n`
		if (this.options.headers) {
			for (const key in this.options.headers) {
				content += `\t\t${key.toLowerCase()}: ${
					this.options.headers[key].type
				},\n`
			}
		}
		if (this.options.params) {
			content += `\t\t`
		}
		if (this.options.query) {
			content += `\t\t`
		}
		if (this.options.body) {
			for (const key in this.options.body) {
				content += `\t\t${key}: ${this.options.body[key].type},\n`
			}
		}
		content += `\t) {\n`
		content += `\t\tlet response = ""\n`
		content += `\n\t\t// put your business logic here\n\n`
		content += `\t\treturn response\n`
		content += "\t}"

		return content
	}
}

export let RouteFactory = (function () {
	let tokenList = {
		get: Get,
		post: Post,
		import: Import,
		decorator: Decorator,
		class: Class,
		function: ServiceFunction,
	}

	return {
		create: function (token, options) {
			const FileToken = tokenList[token]
			return new FileToken(options)
		},
	}
})()
