import { Injectable, Logger } from "../../packages/flint/common"

@Injectable()
export class ApiController {
	constructor(private readonly logger: any) {
		this.logger = logger
	}

	test() {
		return "This is the response of /v3/test"
	}

	doctorList() {
		return "This is the response of /v3/doctor/list"
	}

	doctor() {
		return "This is the response of /v3/doctor"
	}

	testApi1() {
		const data = "testApi1"
		this.logger.info(data)

		return data
	}

	testApi2() {
		const data = "testApi2"
		console.info(data)

		return data
	}
}
