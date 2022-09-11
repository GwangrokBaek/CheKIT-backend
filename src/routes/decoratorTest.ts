import { Get, Post, Router } from "../../packages/flint/common"

@Router("/testUrl")
class TestRouter {
	@Get("/test1")
	testApi1(): void {
		console.log("hi")
	}

	@Post("/test2")
	testApi2(): void {
		console.log("bye")
	}
}

export default TestRouter
