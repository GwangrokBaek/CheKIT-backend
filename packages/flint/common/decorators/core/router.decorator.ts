import "reflect-metadata"
import { RequestHandler, Router as ExpressRouter } from "express"
import { ERouterMetaKeys } from "../../enums"
import { IOptions } from "../../../core/interfaces"
import { JsonToRoute } from "../../../core"
import { ROUTER_METADATA } from "../../constants"

export function Router(prefix: string = "", jsonToRouteOptions: IOptions = {}) {
	return function (target: any) {
		const router = ExpressRouter()

		if (Object.keys(jsonToRouteOptions).length !== 0) {
			jsonToRouteOptions.prefix = prefix
			new JsonToRoute(router, jsonToRouteOptions).execute()
		}

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
				router[method](`${prefix}${path}`, (req, res) => {
					res.send(routeHandler())
				})
			}
		})

		Reflect.defineMetadata(ROUTER_METADATA, router, target)
	}
}
