import { type credit_card } from '@prisma/client';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const CreditCardCreateInput = z.object({
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  number: z.string().nullable(),
  security_number: z.string().nullable(),
  expiry_date: z.string().nullable(),
  zip: z.string().nullable()
});

export const CreditCardUpdateInput = z
  .object({
    card_id: z.number()
  })
  .merge(CreditCardCreateInput);

export const CreditCardDeleteInput = z.object({
  id: z.number()
});

export const SearchInput = z.object({
  input: z.string()
});

export const CreditCardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.credit_card.findMany();
  }),

  getSearch: publicProcedure.input(SearchInput).query(({ ctx, input }) => {
    const searchQuery = ctx.db.$queryRaw<
      credit_card[]
    >`SELECT * FROM credit_card WHERE name ILIKE '%' || ${input.input} || '%'`;

    if (!input.input) return ctx.db.credit_card.findMany();

    return searchQuery;
  }),

  create: publicProcedure
    .input(CreditCardCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.credit_card.create({
        data: input
      });
    }),

  update: publicProcedure
    .input(CreditCardUpdateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.credit_card.update({
        where: { card_id: input.card_id },
        data: input
      });
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
