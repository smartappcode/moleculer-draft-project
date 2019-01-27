"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 8800,

		routes: [{
			path: "/api",
			aliases: {
				"REST users": "users",
				"GET products/getproducts": "products.getproducts",
				"REST products": "products",
				"GET cart/showcart": "cart.showcart",
				"POST cart/addtocart": "cart.addtocart",
				"REST cart": "cart"
			},
			whitelist: [
				// Access to any actions in all services under "/api" URL
				"**"
			]
		}],
		bodyParsers: {
			json: true,
			urlencoded: true
		},

		// Serve assets from "public" folder
		assets: {
			folder: "public"
		}
	}
};
