import { Module } from "../../packages/flint/common"
import { ApiRouter } from "../routes/api.router"
import { ApiController } from "../controllers/api.controller"

@Module({
	imports: [],
	routers: [ApiRouter],
	providers: [ApiController],
})
export class AppModule {}
