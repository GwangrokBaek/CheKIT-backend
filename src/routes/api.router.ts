import { Get, Router } from "../../packages/flint/common"

@Router("", {
	files: ["api.json"],
	directory: __dirname,
	log: true,
	jwt: "auth.middleware.ts",
})
export class ApiRouter {
	constructor(private readonly apiController: any) {
		this.apiController = apiController
	}

	@Get("/test1")
	testApi1(): any {
		return this.apiController.testApi()
	}
}
