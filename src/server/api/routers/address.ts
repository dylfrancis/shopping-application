import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const AddressDeleteInput = z.object({
  id: z.number()
});

export const AddressRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.credit_card.findMany();
  }),

  delete: publicProcedure
    .input(AddressDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.customer_address.delete({
        where: {
          cust_address_id: input.id
        }
      });
    })
});