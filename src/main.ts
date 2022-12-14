import { AppModule } from "./modules/app.module"
import { Flint } from "../packages/flint/core"

async function main() {
	const appModule = new AppModule()
	const app = await Flint.create([appModule])
	await app.listen(3000)
}

main()
