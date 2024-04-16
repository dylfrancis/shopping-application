import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const ProductDeleteInput = z.object({
  id: z.number()
});

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany();
  }),

  delete: publicProcedure
    .input(ProductDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.delete({
        where: {
          product_id: input.id
        }
      });
    })
});
