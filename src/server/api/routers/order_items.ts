import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const OrderItemCreateInput = z.object({
  order_id: z.number(),
  product_id: z.number(),
  quantity: z.number()
});

export const orderItemsRouter = createTRPCRouter({
  postOrderItem: publicProcedure
    .input(OrderItemCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.orders.create({ data: input });
    })
});
