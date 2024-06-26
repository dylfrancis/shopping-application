import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { productRouter } from './routers/product';
import { addressRouter } from './routers/address';
import { CreditCardRouter } from './routers/credit_card';
import { customerRouter } from './routers/customer';
import { ordersRouter } from './routers/orders';
import { orderItemsRouter } from './routers/order_items';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  CreditCard: CreditCardRouter,
  address: addressRouter,
  customer: customerRouter,
  order: ordersRouter,
  orderItem: orderItemsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
