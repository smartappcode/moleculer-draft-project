"use strict";
const db = require("./db.service");
module.exports = {
    name: "cart",

    allUsers: null,


	/**
	 * Service settings
	 */
    settings: {

    },

    mixins: [db],
	/**
	 * Service dependencies
	 */
    dependencies: [],

	/**
	 * Actions
	 */
    actions: {

		/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */

        hello() {
            return "Hello Moleculer";
        },

		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 * @param {String} position
		 */

        list(ctx) {
            return [...this.store.entries()];
        },

        showcart: {
            params: { key: { type: "array", items: { type: "number", integer: true, positive: true, convert: true } } },

            handler(ctx) {
               // let arrKeyProd = [1, 2];
                return this.broker.call("products.getproducts", { key: ctx.params.key });
                
            }
        },
        addtocart: {
            params: {
                key: { type: "number", integer: true, convert: true, positive: true },
                productId: { type: "number", integer: true, convert: true, positive: true }
            },
            handler(ctx) {
                const productId = Number(ctx.params.productId);
                return this.store.set({ productId: productId });
            }
        }
    },

	/**
	 * Events
	 */
    events: {

    },

	/**
	 * Methods
	 */
    methods: {

    },

	/**
	 * Service created lifecycle event handler
	 */
    created() {
        this.store = new Map([
            [
                1, {
                    productId: 1,
                }
            ],
            [
                2, {
                    productId: 2,
                }
            ]
        ]);
    },

	/**
	 * Service started lifecycle event handler
	 */
    started() {

    },

	/**
	 * Service stopped lifecycle event handler
	 */
    stopped() {

    }
};