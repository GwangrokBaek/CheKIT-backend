import * as jwt from "jsonwebtoken"

const authChecker = async (req, res, next) => {
	try {
		const headers = req.headers
		const token = headers.authorization.split(" ")[1]
		const decoded = await jwt.verify(token, process.env.SECRET)

		if (decoded) {
			req.userId = decoded.id
			next()
		} else {
			res.status(401).json({ error: "Unauthorized" })
		}
	} catch (error) {
		res.status(401).json({ error: "Unauthorized" })
	}
}

export default authChecker
