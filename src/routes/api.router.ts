import { Get, Post, Router } from "../../packages/flint/common"

@Router("/testUrl", {
	files: ["api.json", "sample.json"],
	cors: true,
	directory: __dirname,
	log: true,
})
class ApiRouter {
	constructor(private readonly apiService) {}

	@Get("/test1")
	testApi1(): void {
		console.log("hi")
	}

	@Post("/test2")
	testApi2(): void {
		console.log("bye")
	}
}

export default ApiRouter
