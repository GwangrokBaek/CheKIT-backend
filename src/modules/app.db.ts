import mongoose from "mongoose"
import * as dotenv from "dotenv"

dotenv.config()

export class AppDB {
	private _model: mongoose.Model<mongoose.Document>

	constructor(private readonly logger: any) {
		this.logger = logger
		this.connect()
	}

	private connect() {
		try {
			mongoose.connect(process.env.MONGO_URL)
			this.logger.info("Connected to MongoDB")
		} catch (error) {
			this.logger.error(error)
		}
	}

	public get model() {
		return this._model
	}
}
