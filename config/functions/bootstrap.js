"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

const findPublicRole = async () => {
  const result = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "public" });
  return result;
};

const setDefaultPermissions = async () => {
  const role = await findPublicRole();
  let permissions = await strapi
    .query("permission", "users-permissions")
    .find({ type: "application", role: role.id });

  permissions = permissions.filter((p) => {
    if (p.controller === "categories") {
      return p.action === "find" || p.action === "findone";
    }
    if (p.controller === "contact") {
      return p.action === "create";
    }
    if (p.controller === "posts") {
      return p.action === "findone";
    }
    if (p.controller === "projects") {
      return p.action === "find" || p.action === "findone";
    }
    if (p.controller === "request-demo") {
      return p.action === "create";
    }
    if (p.controller === "social-media") {
      return p.action === "find";
    }
  });

  await Promise.all(
    permissions.map((p) => {
      return strapi
        .query("permission", "users-permissions")
        .update({ id: p.id }, { enabled: true });
    })
  );
};

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "type",
    name: "setup",
  });
  const initHasRun = await pluginStore.get({ key: "initHasRun" });
  await pluginStore.set({ key: "initHasRun", value: true });
  return !initHasRun;
};

module.exports = async () => {
  //   const shouldSetDefaultPermissions = await isFirstRun();
  //   if (shouldSetDefaultPermissions) {
  await setDefaultPermissions();
  //   }
};

// module.exports = () => {};
