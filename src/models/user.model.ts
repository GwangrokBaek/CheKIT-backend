import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		key: { type: String, required: true },
		name: { type: String },
	},
	{ versionKey: false }
)

userSchema.statics.create = function (email, key, name) {
	const user = new this({
		email,
		key,
		name,
	})
	return user.save()
}

userSchema.statics.findOneByEmail = function (email) {
	return this.findOne({
		email,
	})
}

userSchema.statics.deleteByEmail = function (email) {
	return this.remove({ email })
}

export const User = mongoose.model("User", userSchema)
