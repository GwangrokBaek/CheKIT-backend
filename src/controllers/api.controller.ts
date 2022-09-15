import { Injectable } from "../../packages/flint/common"
import * as jwt from "jsonwebtoken"

@Injectable()
export class ApiController {
	constructor(
		private readonly logger: any,
		private readonly userModel: any,
		private readonly doctorModel: any
	) {
		this.logger = logger
		this.userModel = userModel
		this.doctorModel = doctorModel
	}

	async test(req, res) {
		this.logger.info(``)
		return {}
	}

	async signup(req, res) {
		let result

		try {
			const body = req.body

			await this.userModel.create(body.email, body.key, body.name)

			const token = await jwt.sign(
				{ id: body.email },
				process.env.SECRET,
				{
					expiresIn: "1h",
				}
			)

			result = { status: "ok", data: { token: token } }
		} catch (error) {
			this.logger.error(error)

			if (error.code === 11000) {
				result = { status: "user_duplicate" }
			} else {
				result = { status: "nok" }
			}
		}

		return result
	}

	async withdrawal(req, res) {
		let result

		try {
			await this.userModel.deleteByEmail(req.userId)

			result = { status: "ok" }
		} catch (error) {
			this.logger.error(error)
			result = { status: "nok" }
		}

		return result
	}

	async signin(req, res) {
		let result

		try {
			const body = req.body

			const user = await this.userModel.findOneByEmail(body.email)

			if (user) {
				if (user.key === body.key) {
					const token = await jwt.sign(
						{ id: user.email },
						process.env.SECRET,
						{
							expiresIn: "1h",
						}
					)

					result = { status: "ok", data: { token: token } }
				} else {
					result = { status: "nok" }
				}
			} else {
				result = { status: "no_user" }
			}
		} catch (error) {
			this.logger.error(error)
			result = { status: "nok" }
		}

		return result
	}

	async doctorList(req, res) {
		let result

		try {
			const select = {
				id: true,
				doctor_display_name: true,
				doctor_image_url: true,
				hospital_name: true,
				hospital_address: true,
				description: true,
				hospital_img: true,
			}

			const doctors = await this.doctorModel.findAll(select)
			result = { status: "ok", data: { doctors } }
		} catch (error) {
			this.logger.error(error)
			result = { status: "nok" }
		}

		return result
	}

	async doctor(req, res) {
		let result

		try {
			const id = req.query.doctor_id

			const doctor = await this.doctorModel.findOneById(id)

			doctor.doctor_images = JSON.stringify(doctor.doctor_images)

			result = { status: "ok", data: { doctor } }
		} catch (error) {
			this.logger.error(error)
			result = { status: "nok" }
		}

		return result
	}

	async register(req, res) {
		let result

		try {
			result = { status: "ok" }
		} catch (error) {
			this.logger.error(error)
			result = { status: "nok", data: { message: "다시 시도해주세요" } }
		}

		return result
	}

	testApi(req, res) {
		const data = "testApi1"
		this.logger.info(data)

		return data
	}
}
