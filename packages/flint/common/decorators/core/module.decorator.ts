import "reflect-metadata"
import { IModuleMetadata } from "../../interfaces/IModuleMetadata"
import { ROUTER_METADATA } from "../../constants"

export function Module(metadata: IModuleMetadata): ClassDecorator {
	return (target: Function) => {
		for (const property in metadata) {
			if (metadata.hasOwnProperty(property)) {
				Reflect.defineMetadata(
					property,
					(metadata as any)[property],
					target
				)
			}

			if (property === "routers") {
				for (const router of (metadata as any)[property]) {
					const routerMetadata = Reflect.getMetadata(
						ROUTER_METADATA,
						router
					)
					Reflect.defineMetadata(
						ROUTER_METADATA,
						routerMetadata,
						target
					)
				}
			}
		}
	}
}
