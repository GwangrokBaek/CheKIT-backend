import "reflect-metadata"
import { INJECTABLE_FLAG } from "../../constants"

export function Injectable(): ClassDecorator {
	return (target: object) => {
		Reflect.defineMetadata(INJECTABLE_FLAG, true, target)
	}
}
