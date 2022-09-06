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
		content += `\tasync ${this.options.apiName}(\n`
		if (this.options.params) {
			content += `\t\t`
		}
		if (this.options.query) {
			content += `\t\t`
		}
		content += `\t): Promise<string> {\n`
		content += `\t\treturn await this.${this.options.fileName}Service.${this.options.apiName}()\n`
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
		content += `\tasync ${this.options.apiName}(\n`
		if (this.options.params) {
			content += `\t\t`
		}
		if (this.options.query) {
			content += `\t\t`
		}
		if (this.options.body) {
			for (const key in this.options.body) {
				content += `\t\t@Body('${key}') ${key}: ${this.options.body[key].type},\n`
			}
		}
		content += `\t): Promise<string> {\n`
		content += `\t\treturn await this.${this.options.fileName}Service.${this.options.apiName}()\n`
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

export let ControllerFileFactory = (function () {
	let tokenList = {
		get: Get,
		post: Post,
		import: Import,
		decorator: Decorator,
		class: Class,
	}
	return {
		create: function (token, options) {
			const FileToken = tokenList[token]
			return new FileToken(options)
		},
	}
})()
