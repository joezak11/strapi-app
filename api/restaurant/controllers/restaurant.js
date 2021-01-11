'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const _ = require('lodash');
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
	async findUrls(ctx) {
		let entities;
		if (ctx.query._q) {
			entities = await strapi.services.restaurant.search(ctx.query);
		} else {
			entities = await strapi.services.restaurant.find(ctx.query);
		}
		entities = entities.map(entity => {
			entity.image = entity.image.url;
			return sanitizeEntity(entity, { model: strapi.models.restaurant });
		});
		return entities;
	},
	async findUrl(ctx) {
		const { id } = ctx.params;
		let entity = await strapi.services.restaurant.find({ id });
		entity = entity[0]
		entity.image = entity.image.url;
		return sanitizeEntity(entity, { model: strapi.models.restaurant });
	}
};
