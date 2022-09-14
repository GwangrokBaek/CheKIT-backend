import "reflect-metadata"
import { IModuleMetadata } from "../../interfaces/IModuleMetadata"
import { ROUTER_METADATA } from "../../constants"

export function Module(): ClassDecorator {
	return (target: Function) => {}
}
