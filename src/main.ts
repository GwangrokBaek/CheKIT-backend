import { AppModule } from "./modules/app.module"
import { Flint } from "../packages/flint/core"

async function main() {
	const app = await Flint.create([AppModule])
	await app.listen(3000)
}

main()
