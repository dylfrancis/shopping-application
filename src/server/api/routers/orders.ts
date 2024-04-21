import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const OrderCreateInput = z.object({
  customer_id: z.number(),
  status: z.string(),
  credit_card_id: z.number(),
  order_date: z.string().refine(
    (dateString) => {
      // Check if the string is in the format 'YYYY-MM-DD' (ISO date without time)
      return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
    },
    {
      message: 'Date must be in ISO format (YYYY-MM-DD) with no time component'
    }
  )
});

export const ordersRouter = createTRPCRouter({
  postOrder: publicProcedure
    .input(OrderCreateInput)
    .mutation(async ({ ctx, input }) => {
      const createdOrder = await ctx.db.orders.create({ data: input });
      return { id: createdOrder.order_id };
    })
});
