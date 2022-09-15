import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema(
	{
		id: { type: String, required: true, unique: true },
		description: { type: String },
		hospital_name: { type: String, required: true },
		hospital_address: { type: String, required: true },
		hospital_img: { type: String, required: true },
		doctor_display_name: { type: String, required: true },
		doctor_image_url: { type: String, required: true },
		doctor_images: { type: Array, required: true },
		doctor_tel: { type: String, required: true },
		available_hours: { type: String, required: true },
		available_weekday: { type: String, required: true },
		lab_addr: { type: String, required: true },
		lab_name: { type: String, required: true },
		lab_postal_code: { type: String, required: true },
		lab_receiver_name: { type: String, required: true },
		lab_tel: { type: String, required: true },
		lat: { type: String, required: true },
		lng: { type: String, required: true },
		professional_statement: { type: String, required: true },
		subjects: { type: String, required: true },
	},
	{ versionKey: false }
)

doctorSchema.statics.findAll = function (select?: any) {
	return select ? this.find({}, select) : this.find({})
}

doctorSchema.statics.findOneById = function (id: string) {
	return this.findOne({ id })
}

export const Doctor = mongoose.model("Doctor", doctorSchema)
