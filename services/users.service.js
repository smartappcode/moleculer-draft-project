"use strict";

module.exports = {
    name: "users",

    allUsers: null,

	
	/**
	 * Service settings
	 */
    settings: {

    },

	/**
	 * Service dependencies
	 */
	dependencies: ["db"],

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
			return ctx.broker.call("db.entries");
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
    
    },

	/**
	 * Service started lifecycle event handler
	 */
    async started() {
        await this.broker.mcall([
            { action: "db.create", params: { key: 1, value: "Pavel" }},
            { action: "db.create", params: { key: 2, value: "Katya" } },
            { action: "db.create", params: { key: 3, value: "Vova" } }
        ]);
    },

	/**
	 * Service stopped lifecycle event handler
	 */
    stopped() {

    }
};