import {
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react';
import { type product } from '@prisma/client';
import { type Key } from 'react';
import { formatCurrency } from '~/utils/general';

export const StaffProductCard = (props: {
  product: product;
  key: Key;
  onDelete?: () => void;
}) => {
  const { product, key, onDelete } = props;
  return (
    <Card key={key}>
      <CardBody>
        <Stack>
          <Heading>{product.name}</Heading>
          <Text>{product.description}</Text>
          <Text>{formatCurrency(product.price)}</Text>
          <Divider></Divider>
          <Button colorScheme="red" onClick={onDelete}>
            Delete
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
