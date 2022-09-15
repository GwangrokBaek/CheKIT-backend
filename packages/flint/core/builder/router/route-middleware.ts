import { IOptions, IRouteObject } from "../../interfaces"
import * as path from "path"
import * as validator from "express-validator"

export class RouteMiddleware {
	private options: IOptions
	private data: IRouteObject
	private logger: any

	constructor(options: IOptions, data: IRouteObject, logger: any) {
		this.options = options
		this.data = data
		this.logger = logger
	}

	getMiddleware(hasJwt: boolean): Array<any> {
		let middleware: any[] = []

		const checkers = this.getValidatorMiddleware()

		if (checkers.length > 0) {
			middleware.push(checkers)
			middleware.push((req, res, next) => {
				const errorFormatter = ({
					location,
					msg,
					param,
					value,
					nestedErrors,
				}: validator.ValidationError) => {
					return `${location}[${param}]: ${msg}`
				}
				const result = validator
					.validationResult(req)
					.formatWith(errorFormatter)

				if (result.isEmpty()) {
					next()
				} else {
					const errors = [...new Set(result.array())]
					this.logger.error(`URL -> ${req.url}, Message -> ${errors}`)
					res.status(400).json({ errors: errors })
				}
			})
		}

		if (hasJwt) {
			middleware.push(this.getJwtMiddleware())
		}

		return middleware
	}

	getJwtMiddleware(): any {
		const jwtPath = require(path.join(
			this.options.directory,
			`../middlewares/${this.options.jwt}`
		))

		return jwtPath.default
	}

	getValidatorMiddleware(): any {
		const checkers: any[] = []

		if (this.data.headers) {
			this.pushChecker(checkers, this.data, "headers")
		}

		if (this.data.body) {
			this.pushChecker(checkers, this.data, "body")
		}

		if (this.data.query) {
			this.pushChecker(checkers, this.data, "query")
		}

		if (this.data.params) {
			this.pushChecker(checkers, this.data, "params")
		}

		return checkers
	}

	pushChecker(checker: any, data: any, target: string) {
		switch (target) {
			case "headers":
				Object.keys(data.headers).forEach((key: string) => {
					switch (data.headers[key].type) {
						case "string":
							data.headers[key].required
								? checker.push(
										validator
											.header(
												key,
												`${key} is missing or wrong`
											)
											.isString()
											.notEmpty()
								  )
								: checker.push(
										validator
											.header(key, `${key} is wrong`)
											.isString()
								  )
							break
						case "number":
							data.headers[key].required
								? checker.push(
										validator
											.header(
												key,
												`${key} is missing or wrong`
											)
											.isNumeric()
											.notEmpty()
								  )
								: checker.push(
										validator
											.header(key, `${key} is wrong`)
											.isNumeric()
								  )
							break
						case "boolean":
							data.headers[key].required
								? checker.push(
										validator
											.header(
												key,
												`${key} is missing or wrong`
											)
											.isBoolean()
											.notEmpty()
								  )
								: checker.push(
										validator
											.header(key, `${key} is wrong`)
											.isBoolean()
								  )
							break
						case "array":
							data.headers[key].required
								? checker.push(
										validator
											.header(
												key,
												`${key} is missing or wrong`
											)
											.isArray()
											.notEmpty()
								  )
								: checker.push(
										validator
											.header(key, `${key} is wrong`)
											.isArray()
								  )
							break
						default:
							data.headers[key].required
								? checker.push(
										validator
											.header(
												key,
												`${key} is missing or wrong`
											)
											.isString()
											.notEmpty()
								  )
								: checker.push(
										validator
											.header(key, `${key} is wrong`)
											.isString()
								  )
							break
					}
				})
				break
			case "body":
				Object.keys(data.body).forEach((key: string) => {
					switch (data.body[key].type) {
						case "string":
							data.body[key].required
								? checker.push(
										validator
											.body(
												key,
												`${key} is missing or wrong`
											)
											.isString()
											.notEmpty()
								  )
								: checker.push(
										validator
											.body(key, `${key} is wrong`)
											.isString()
								  )
							break
						case "number":
							data.body[key].required
								? checker.push(
										validator
											.body(
												key,
												`${key} is missing or wrong`
											)
											.isNumeric()
											.notEmpty()
								  )
								: checker.push(
										validator
											.body(key, `${key} is wrong`)
											.isNumeric()
								  )
							break
						case "boolean":
							data.body[key].required
								? checker.push(
										validator
											.body(
												key,
												`${key} is missing or wrong`
											)
											.isBoolean()
											.notEmpty()
								  )
								: checker.push(
										validator
											.body(key, `${key} is wrong`)
											.isBoolean()
								  )
							break
						case "array":
							data.body[key].required
								? checker.push(
										validator
											.body(
												key,
												`${key} is missing or wrong`
											)
											.isArray()
											.notEmpty()
								  )
								: checker.push(
										validator
											.body(key, `${key} is wrong`)
											.isArray()
								  )
							break
						default:
							data.body[key].required
								? checker.push(
										validator
											.body(
												key,
												`${key} is missing or wrong`
											)
											.isString()
											.notEmpty()
								  )
								: checker.push(
										validator
											.body(key, `${key} is wrong`)
											.isString()
								  )
							break
					}
				})
				break
			case "query":
				Object.keys(data.query).forEach((key: string) => {
					switch (data.query[key].type) {
						case "string":
							data.query[key].required
								? checker.push(
										validator
											.query(
												key,
												`${key} is missing or wrong`
											)
											.isString()
											.notEmpty()
								  )
								: checker.push(
										validator
											.query(key, `${key} is wrong`)
											.isString()
								  )
							break
						case "number":
							data.query[key].required
								? checker.push(
										validator
											.query(
												key,
												`${key} is missing or wrong`
											)
											.isNumeric()
											.notEmpty()
								  )
								: checker.push(
										validator
											.query(key, `${key} is wrong`)
											.isNumeric()
								  )
							break
						case "boolean":
							data.query[key].required
								? checker.push(
										validator
											.query(
												key,
												`${key} is missing or wrong`
											)
											.isBoolean()
											.notEmpty()
								  )
								: checker.push(
										validator
											.query(key, `${key} is wrong`)
											.isBoolean()
								  )
							break
						case "array":
							data.query[key].required
								? checker.push(
										validator
											.query(
												key,
												`${key} is missing or wrong`
											)
											.isArray()
											.notEmpty()
								  )
								: checker.push(
										validator
											.query(key, `${key} is wrong`)
											.isArray()
								  )
							break
						default:
							data.query[key].required
								? checker.push(
										validator
											.query(
												key,
												`${key} is missing or wrong`
											)
											.isString()
											.notEmpty()
								  )
								: checker.push(
										validator
											.query(key, `${key} is wrong`)
											.isString()
								  )
							break
					}
				})
				break
			case "params":
				Object.keys(data.params).forEach((key: string) => {
					switch (data.params[key].type) {
						case "string":
							data.params[key].required
								? checker.push(
										validator
											.param(
												key,
												`${key} is missing or wrong`
											)
											.isString()
											.notEmpty()
								  )
								: checker.push(
										validator
											.param(key, `${key} is wrong`)
											.isString()
								  )
							break
						case "number":
							data.params[key].required
								? checker.push(
										validator
											.param(
												key,
												`${key} is missing or wrong`
											)
											.isNumeric()
											.notEmpty()
								  )
								: checker.push(
										validator
											.param(key, `${key} is wrong`)
											.isNumeric()
								  )
							break
						case "boolean":
							data.params[key].required
								? checker.push(
										validator
											.param(
												key,
												`${key} is missing or wrong`
											)
											.isBoolean()
											.notEmpty()
								  )
								: checker.push(
										validator
											.param(key, `${key} is wrong`)
											.isBoolean()
								  )
							break
						case "array":
							data.params[key].required
								? checker.push(
										validator
											.param(
												key,
												`${key} is missing or wrong`
											)
											.isArray()
											.notEmpty()
								  )
								: checker.push(
										validator
											.param(key, `${key} is wrong`)
											.isArray()
								  )
							break
						default:
							data.params[key].required
								? checker.push(
										validator
											.param(
												key,
												`${key} is missing or wrong`
											)
											.isString()
											.notEmpty()
								  )
								: checker.push(
										validator
											.param(key, `${key} is wrong`)
											.isString()
								  )
							break
					}
				})
				break
			default:
				break
		}
	}
}
