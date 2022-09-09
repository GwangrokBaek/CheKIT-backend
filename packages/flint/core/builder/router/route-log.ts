import { IRegisterResult } from "./interfaces"
import * as CliTable from "cli-table"

export class RouteLog {
	private registerResult: Array<IRegisterResult>

	constructor(registerResult: Array<IRegisterResult>) {
		this.registerResult = registerResult
		this.print()
	}

	print() {
		this.startTag()
		this.content()
		this.endTag()
	}

	startTag() {
		console.log("")
		console.log(` Routes: ${this.registerResult.length}`)
	}

	content() {
		let table: CliTable = new CliTable({
			head: [
				"\x1b[32m\x1b[1mUrl\x1b[0m",
				"\x1b[32m\x1b[1mMethod\x1b[0m",
				"\x1b[32m\x1b[1mController\x1b[0m",
				"\x1b[32m\x1b[1mJWT\x1b[0m",
				"\x1b[32m\x1b[1mCheck\x1b[0m",
			],
			colWidths: [40, 9, 25, 7, 7],
		})

		for (let result of this.registerResult) {
			table.push([
				result.url,
				result.method.toUpperCase(),
				result.controller,
				result.protected ? "Yes" : "\x1b[31mNO\x1b[0m",
				result.status ? "OK" : "\x1b[31mNO\x1b[0m",
			])
		}

		console.log(table.toString())
	}

	endTag() {
		console.log("")
	}
}
