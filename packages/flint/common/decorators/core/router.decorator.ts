import "reflect-metadata"
import { RequestHandler, Router as ExpressRouter } from "express"
import { ERouterMetaKeys } from "../../enums"
import { IOptions } from "../../../core/interfaces"
import { JsonToRoute } from "../../../core"
import { JSON_TO_ROUTER_METADATA, ROUTER_METADATA } from "../../constants"

export function Router(prefix: string = "", jsonToRouteOptions: IOptions = {}) {
	return function (target: any) {
		const routerMetadata = {}
		const jsonToRouterMetadata = {
			prefix: prefix,
			options: jsonToRouteOptions,
		}

		if (Object.keys(jsonToRouteOptions).length !== 0) {
			Reflect.defineMetadata(
				JSON_TO_ROUTER_METADATA,
				jsonToRouterMetadata,
				target
			)
		}

		Object.getOwnPropertyNames(target.prototype).forEach((key) => {
			const apiName = key
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
				routerMetadata[apiName] = {
					path: `${prefix}${path}`,
					method: method,
				}
			}
		})

		Reflect.defineMetadata(ROUTER_METADATA, routerMetadata, target)
	}
}
