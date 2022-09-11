import "reflect-metadata"
import { IModuleMetadata } from "../../interfaces/IModuleMetadata"

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
		}
	}
}
