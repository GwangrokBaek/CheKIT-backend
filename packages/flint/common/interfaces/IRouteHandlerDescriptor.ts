import { RequestHandler } from "express"

export interface IRouteHandlerDescriptor extends PropertyDescriptor {
	handler?: RequestHandler
}
