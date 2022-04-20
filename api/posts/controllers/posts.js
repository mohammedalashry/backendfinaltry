"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx){
    let { page } = ctx.params;
    let entities = await strapi.services.posts.search({ page, _sort:'position' });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.posts })
    );
  },
  // async update(ctx){
  //   console.log(ctx);
  //   // let { page, position } = ctx.body;
  //   // console.log(page, position);
  //   // if(page === "landing page" && position === 3){
  //   //   return ctx.badRequest('name is missing', { foo: 'bar' })
  //   // }
  //   ctx.badRequest('name is missing', { foo: 'bar' })
  // },
  async findPost(ctx) {
    let { page, position } = ctx.params;
    let entities = await strapi.services.posts.search({ page, position });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.posts })
    );
  },
};
