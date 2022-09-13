import { Injectable } from "../../packages/flint/common"

@Injectable()
export class ApiController {
	public static test() {
		return "This is the response of /v3/test"
	}

	public static doctorList() {
		return "This is the response of /v3/doctor/list"
	}

	public static doctor() {
		return "This is the response of /v3/doctor"
	}

	public static testApi1() {
		const data = "testApi1"
		console.log(data)

		return data
	}

	public static testApi2() {
		const data = "testApi2"
		console.log(data)

		return data
	}
}
