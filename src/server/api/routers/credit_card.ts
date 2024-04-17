import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const CreditCardDeleteInput = z.object({
  id: z.number()
});

export const CreditCardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.credit_card.findMany();
  }),

  delete: publicProcedure
    .input(CreditCardDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.credit_card.delete({
        where: {
          card_id: input.id
        }
      });
    })
});