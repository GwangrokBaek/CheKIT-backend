exports.test = (req, res) => {
	res.send("This is the response of /v3/test")
}

exports.doctorList = (req, res) => {
	res.send("This is the response of /v3/doctor/list")
}

exports.doctor = (req, res) => {
	res.send("This is the response of /v3/doctor")
}
