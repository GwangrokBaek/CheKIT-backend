import { ELogLevel } from "../enums"
import * as cliColor from "cli-color"

export class Logger {
	private systemName: string
	private level: ELogLevel = ELogLevel["debug"]

	constructor(level: string | ELogLevel, systemName: string = "App") {
		if (typeof level === "string") {
			this.setLevel(ELogLevel[level])
		} else {
			this.setLevel(level)
		}

		if (systemName === "App") {
			this.systemName = this.getSystemName()
		} else {
			this.systemName = systemName
		}
	}

	private getTimestamp(): string {
		const date = new Date()
		let timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

		return timestamp
	}

	private getSystemName(): string {
		let obj = {} as any
		Error.captureStackTrace(obj, this.constructor)

		let systemName: string = ""
		let stackArray: string[] = obj.stack.split("\n")

		const filteredArray = stackArray.filter(function (val) {
			return !/Error|at Object|at __awaiter|at Generator|at next|at Function.|at Layer.|at Route.|at Module.|at \//g.test(
				val
			)
		})

		let systemString = filteredArray[0].split("at new ")
		let system = systemString[1].split(" ")

		systemName = system[0]

		return systemName
	}

	private getModuleName(method: Function): string {
		let obj = {} as any
		Error.captureStackTrace(obj, method)

		let moduleName: string = ""
		let stackArray: string[] = obj.stack.split("\n")

		const filteredArray = stackArray.filter(function (val) {
			return !/Error|new|at \/|at Object|at __awaiter|at Generator|at next|at Function.|at Layer.|at Route./g.test(
				val
			)
		})

		let moduleString = filteredArray[0].split("at ")
		moduleString = moduleString[1].split(" ")
		let module = moduleString[0].split(".")

		moduleName = module[0]

		return moduleName
	}

	public setLevel(level: ELogLevel) {
		this.level = level
	}

	public debug(message: string) {
		if (this.level >= ELogLevel["debug"]) {
			const moduleName = this.getModuleName(this.debug)

			console.log(
				`${cliColor.blue(
					`[${this.systemName}]`
				)} DEBUG\t${this.getTimestamp()}\t${cliColor.blue(
					`[${moduleName}]`
				)} ${
					typeof message === "object"
						? JSON.stringify(message)
						: message
				}`
			)
		}
	}

	public info(message: string) {
		if (this.level >= ELogLevel["info"]) {
			const moduleName = this.getModuleName(this.info)

			console.log(
				`${cliColor.blue(
					`[${this.systemName}]`
				)} INFO\t${this.getTimestamp()}\t${cliColor.blue(
					`[${moduleName}]`
				)} ${
					typeof message === "object"
						? JSON.stringify(message)
						: message
				}`
			)
		}
	}

	public warn(message: string) {
		if (this.level >= ELogLevel["warn"]) {
			const moduleName = this.getModuleName(this.warn)

			console.log(
				`${cliColor.blue(`[${this.systemName}]`)} ${cliColor.yellow(
					`WARN`
				)}\t${this.getTimestamp()}\t${cliColor.blue(
					`[${moduleName}]`
				)} ${cliColor.yellow(
					typeof message === "object"
						? JSON.stringify(message)
						: message
				)}`
			)
		}
	}

	public error(message: any) {
		if (this.level >= ELogLevel["error"]) {
			const moduleName = this.getModuleName(this.error)

			console.log(
				`${cliColor.blue(`[${this.systemName}]`)} ${cliColor.red(
					`ERROR`
				)}\t${this.getTimestamp()}\t${cliColor.blue(
					`[${moduleName}]`
				)} ${cliColor.red(message)}`
			)
		}
	}
}
