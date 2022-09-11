import { Module } from "../../packages/flint/common"
import ApiRouter from "../routes/api.router"

@Module({
	imports: [],
	routers: [ApiRouter],
	providers: [],
})
export class AppModule {}
