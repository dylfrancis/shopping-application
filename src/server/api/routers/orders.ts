import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { ProductUpdateInput } from './product';

export const OrderCreateInput = z.object({
  firstName: z.string(),
  lastName: z.string(),
  isNewCard: z.boolean(),
  isNewAddress: z.boolean(),
  customer_id: z.number(),
  status: z.string(),
  credit_card_id: z.number(),
  order_date: z.string(),
  finalProducts: z.array(
    z
      .object({ totalItems: z.number(), totalPrice: z.number() })
      .merge(ProductUpdateInput)
  ),
  street_name: z.string(),
  street_number: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  number: z.string(),
  expiry_date: z.string(),
  security_number: z.string()
});

export const ordersRouter = createTRPCRouter({
  postOrder: publicProcedure
    .input(OrderCreateInput)
    .mutation(async ({ ctx, input }) => {
      let cardId = input.credit_card_id;
      if (input.isNewAddress) {
        await ctx.db.customer_address.create({
          data: {
            street_name: input.street_name,
            street_number: input.street_number,
            city: input.city,
            state: input.state,
            cust_id: input.customer_id
          }
        });
      }

      if (input.isNewCard) {
        const newCard = await ctx.db.credit_card.create({
          data: {
            number: input.number,
            expiry_date: new Date(input.expiry_date),
            security_number: input.security_number,
            firstname: input.firstName ?? '',
            lastname: input.lastName ?? '',
            cust_id: input.customer_id
          }
        });
        cardId = newCard.card_id;
      }
      const createdOrder = await ctx.db.orders.create({
        data: {
          customer_id: input.customer_id,
          status: input.status,
          credit_card_id: cardId,
          order_date: new Date(input.order_date)
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      const order_items_data = input.finalProducts.map((value) => {
        return {
          order_item_id: Math.floor(Math.random() * 2147483647),
          order_id: createdOrder.order_id,
          product_id: value.product_id,
          quantity: value.totalItems
        };
      });
      await ctx.db.order_items.createMany({
        data: order_items_data
      });
    })
});
