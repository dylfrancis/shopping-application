import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const GetUserInput = z.object({
  username: z.string()
});

export const customerRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(GetUserInput)
    .mutation(async ({ ctx, input }) => {
      console.log('fetching');
      return await ctx.db.customer.findFirstOrThrow({
        where: {
          username: input.username
        }
      });
    })
});
