import * as path from "path"

export interface IOptions {
	files?: string[]
	cors?: boolean
	corsOptions?: any
	jwt?: string
	directory?: string
	log?: boolean
	prefix?: string
	controller?: any
}

export function getOptions(options: IOptions = {}): IOptions {
	options.files = options.files || []
	options.cors =
		options.cors || (options.hasOwnProperty("cors") ? options.cors : true)
	options.corsOptions = options.corsOptions || {}
	options.directory = options.directory || process.cwd()
	options.log = options.log || false
	options.prefix = options.prefix || ""
	options.controller = options.controller || undefined
	options.jwt = options.jwt || ""

	return options
}
