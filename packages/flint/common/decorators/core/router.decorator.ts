import "reflect-metadata"
import { RequestHandler, Router as ExpressRouter } from "express"
import { ERouterMetaKeys } from "../../enums"
import { IOptions } from "../../../core/interfaces"

export function Router(prefix: string = "", jsonToRouteOptions: IOptions = {}) {
	return function (target: any) {
		const router = ExpressRouter()

		Object.getOwnPropertyNames(target.prototype).forEach((key) => {
			const routeHandler = target.prototype[key]
			const path = Reflect.getMetadata(
				ERouterMetaKeys.path,
				target.prototype,
				key
			)
			const method = Reflect.getMetadata(
				ERouterMetaKeys.method,
				target.prototype,
				key
			)

			if (path) {
				router[method](`${prefix}${path}`, routeHandler)
			}
		})

		Reflect.defineMetadata("router", router, target)
	}
}
