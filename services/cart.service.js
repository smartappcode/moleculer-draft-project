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

    mixins: [],
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
                // key: { type: "number", integer: true, convert: true, positive: true },
                productId: { type: "number", integer: true, convert: true, positive: true }
            },
            handler(ctx) {

                let { productId } = ctx.params;
                if (this.myCart.hasOwnProperty(productId)) {
                    this.myCart[productId]++;
                } else {
                    this.myCart[productId] = 1;
                }
                return this.myCart;

                /*
                let {productId} = ctx.params;
                this.myCart.push(productId);
                return this.myCart;
                */
            }
        },

        checkout() {
            let finalPrice = 0;
            this.broker.call("products.list")
                .then(product => {
                    for (let [key, value] of product) {
                        if (key in this.myCart) {
                            let productPrice = value * this.myCart[key];
                            finalPrice = +productPrice;
                        }
                    }
                    return Promise.resolve(finalPrice);
                });
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
        //  this.myCart = [];
        this.myCart = {
            "1": 2
        };
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