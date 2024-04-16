import { type Decimal } from '@prisma/client/runtime/library';

export const formatCurrency = (value?: Decimal | string | number | null) => {
  if (!value) return;
  return `$${Number(value).toFixed(2)}`;
};
