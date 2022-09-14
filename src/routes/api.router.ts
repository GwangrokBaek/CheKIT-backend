import { Get, Post, Router } from "../../packages/flint/common"

@Router("/testUrl", {
	files: ["api.json"],
	cors: true,
	directory: __dirname,
	log: true,
})
export class ApiRouter {
	constructor(
		private readonly apiController: any,
		private readonly logger: any
	) {
		this.apiController = apiController
		this.logger = logger
	}

	@Get("/test1")
	testApi1(): any {
		this.logger.info("test")
		return this.apiController.testApi1()
	}

	@Post("/test2")
	testApi2(): any {
		return this.apiController.testApi2()
	}
}
