/**
 * message controller
 */

import { factories, type Strapi } from '@strapi/strapi'




export default factories.createCoreController('api::message.message', ({ strapi }: { strapi: Strapi }) => ({
    async create(ctx) {
        const { body } = ctx.request;
        console.log(body)

        // if (!content || !sender || !chatRoom)
        //     return ctx.badRequest('Please provide all required fields');

        // const message = await strapi.services.message.create({
        //     content,
        //     sender,
        //     chatRoom
        // });

    }
})
);
