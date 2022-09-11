import "reflect-metadata"
import { EHttpMethod, ERouterMetaKeys } from "../../enums"
import { IRouteHandlerDescriptor } from "../../interfaces/IRouteHandlerDescriptor"

function routeBindFactory(method: EHttpMethod) {
	return function (path: string) {
		return function (
			target: any,
			key: string,
			desc: IRouteHandlerDescriptor
		) {
			Reflect.defineMetadata(ERouterMetaKeys.method, method, target, key)
			Reflect.defineMetadata(ERouterMetaKeys.path, path, target, key)
		}
	}
}

export const Get = routeBindFactory(EHttpMethod.get)
export const Post = routeBindFactory(EHttpMethod.post)
export const Put = routeBindFactory(EHttpMethod.put)
export const Patch = routeBindFactory(EHttpMethod.patch)
export const Delete = routeBindFactory(EHttpMethod.del)
