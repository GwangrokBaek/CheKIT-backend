#!/usr/bin/env node

import { RouteBuilder } from "./route-builder"

const routeBuilder = new RouteBuilder()

routeBuilder.setSpecFiles(["api.json"]).parseSpecFiles().build()
