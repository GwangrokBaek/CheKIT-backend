import { Module } from "../../packages/flint/common"
import TestRouter from "../routes/decoratorTest"

@Module({
	imports: [],
	routers: [TestRouter],
	providers: [],
})
export class AppModule {}
