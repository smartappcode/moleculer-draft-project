"use strict";
const db = require("./db.service");
module.exports = {
    name: "products",

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

        create: {
            params: {
                title: { type: "string" },
                price: { type: "number", integer: true, convert: true, positive: true  }
            },
            handler(ctx) {
                let { title, price } = ctx.params;
                //title = "tiktak";
                //price = Number(6);
                const newKey = this.store.size + 1;
                this.store.set(newKey, { title, price });
                return this.store;
            }
        },

        remove: {
            params: {
                key: {
                    type: "number",
                    positive: true,
                    integer: true,
                    convert: true
                }
            },
            handler(ctx){
                this.store.delete(key);
                return this.store;
            }
        },

        getproducts: {
            params: { key: [{ type: "array", items: { type: "number", integer: true, positive: true, convert: true } }, { type: "number", integer: true, positive: true, convert: true }] },
            handler(ctx) {
                let newArrCart = [];
                let count = 0;
                // const keyarr = [1, 3];
                const keyarr = ctx.params.key;
                for (let [key, value] of this.store.entries()) {
                    if (keyarr.includes(key)) {
                        newArrCart[count] = value;
                        count++;
                    }
                }
                return newArrCart;

                /*
                        getproducts: {
                            params: { key: [{ type: "array", items: { type: "number", integer: true, positive: true, convert: true } }, { type: "number", integer: true, positive: true, convert: true }] },
                            handler(ctx) {
                                let newArrCart = [];
                                let count = 0;
                                // const keyarr = [1, 3];
                                const keyarr = [1, 3];
                                for (let [key, value] of this.store.entries()) {
                                    if (keyarr.includes(key)) {
                                    newArrCart[count] = value;
                                        count++;
                                    }
                                }
                  */
                /*
                                 for(item in ctx.params.key){
                                     newArrCart[count] = item;
                                     count++;
                                 }
                 */
            }
        },

		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 * @param {String} position
		 */

        list(ctx) {
            return [...this.store.entries()];
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
                    title: "Rich",
                    price: 15
                }],
            [
                2, {
                    title: "Lays",
                    price: 10
                }],
            [
                3, {
                    title: "Cola",
                    price: 22
                }]
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