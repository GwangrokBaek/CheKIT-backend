import { ApiController } from "../controllers/api.controller"
import { Get, Post, Router } from "../../packages/flint/common"

@Router("/testUrl", {
	files: ["api.json"],
	cors: true,
	directory: __dirname,
	log: true,
})
export class ApiRouter {
	@Get("/test1")
	testApi1(): any {
		return ApiController.testApi1()
	}

	@Post("/test2")
	testApi2(): any {
		return ApiController.testApi2()
	}
}
