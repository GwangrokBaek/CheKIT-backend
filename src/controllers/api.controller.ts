import { Injectable } from "../../packages/flint/common"

exports.test = (req, res) => {
	res.send("This is the response of /v3/test")
}

exports.doctorList = (req, res) => {
	res.send("This is the response of /v3/doctor/list")
}

exports.doctor = (req, res) => {
	res.send("This is the response of /v3/doctor")
}

@Injectable()
export class ApiController {
	testApi1() {
		const data = "testApi1"
		console.log(data)

		return data
	}

	testApi2() {
		const data = "testApi2"
		console.log(data)

		return data
	}
}
