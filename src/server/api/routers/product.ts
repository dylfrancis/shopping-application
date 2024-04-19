import { type product } from '@prisma/client';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const ProductCreateInput = z.object({
  name: z.string().nullable(),
  price: z.number().nullable(),
  category: z.string().nullable(),
  type: z.string().nullable(),
  brand: z.string().nullable(),
  size: z.string().nullable(),
  description: z.string().nullable()
});

export const ProductUpdateInput = z
  .object({
    product_id: z.number()
  })
  .merge(ProductCreateInput);

export const ProductDeleteInput = z.object({
  id: z.number()
});

export const SearchInput = z.object({
  input: z.string()
});

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany();
  }),

  getSearch: publicProcedure.input(SearchInput).query(({ ctx, input }) => {
    const searchQuery = ctx.db.$queryRaw<
      product[]
    >`SELECT * FROM product WHERE name ILIKE '%' || ${input.input} || '%'`;

    if (!input.input) return ctx.db.product.findMany();

    return searchQuery;
  }),

  create: publicProcedure
    .input(ProductCreateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.create({
        data: input
      });
    }),

  update: publicProcedure
    .input(ProductUpdateInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.update({
        where: { product_id: input.product_id },
        data: input
      });
    }),

  delete: publicProcedure
    .input(ProductDeleteInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.delete({
        where: {
          product_id: input.id
        }
      });
    })
});
