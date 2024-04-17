import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { productRouter } from './routers/product';
import { AddressRouter } from './routers/address';
import { CreditCardRouter } from './routers/credit_card';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  CreditCard: CreditCardRouter,
  Address: AddressRouter

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
