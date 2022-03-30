"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findPost(ctx) {
    // let entities = [];
    let { page, position } = ctx.params;
    // position = parseInt(position);
    // if (page == 1 && position == 5) {           // WHY CHOOSE US
    //   for (let i = 0; i < 6; i++) {
    //     const post = await strapi.services.posts.search({
    //       page,
    //       position: position + i,
    //     });
    //     entities.push(post[0]);
    //   }
    // } else
    let entities = await strapi.services.posts.search({ page, position });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.posts })
    );
  },
};
