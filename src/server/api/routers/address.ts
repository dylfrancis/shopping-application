import { type customer_address } from '@prisma/client';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const AddressCreateInput = z.object({
  street_number: z.string().nullable(),
  street_name: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zip: z.string().nullable(),
});

export const AddressUpdateInput = z
  .object({
    cust_address_id: z.number()
  })
  .merge(AddressCreateInput);

export const AddressDeleteInput = z.object({
  id: z.number()
});

export const SearchInput = z.object({
  input: z.string()
});

export const addressRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.customer_address.findMany();
  }),

  getSearch: publicProcedure.input(SearchInput).query(({ ctx, input }) => {
    const searchQuery = ctx.db.$queryRaw<
      customer_address[]
    >`SELECT * FROM customer_address WHERE name ILIKE '%' || ${input.input} || '%'`;

    if (!input.input) return ctx.db.customer_address.findMany();

    return searchQuery;
  }),

  create: publicProcedure
    .input(AddressCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.customer_address.create({
        data: input
      });
    }),

  update: publicProcedure
    .input(AddressUpdateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.customer_address.update({
        where: { cust_address_id: input.cust_address_id },
        data: input
      });
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
