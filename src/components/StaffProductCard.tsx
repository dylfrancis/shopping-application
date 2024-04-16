import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
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
  isDeleteLoading?: boolean;
  onModify?: () => void;
}) => {
  const { product, key, onDelete, isDeleteLoading = false, onModify } = props;
  return (
    <Card key={key}>
      <CardBody>
        <Stack>
          <Heading>{product.name}</Heading>
          <Text>{product.description}</Text>
          <Text>{formatCurrency(product.price)}</Text>
          <Divider></Divider>
          <Flex gap={4} alignItems="center" justifyContent="center">
            <Button
              colorScheme="red"
              onClick={onDelete}
              isLoading={isDeleteLoading}
            >
              Delete
            </Button>
            <Button colorScheme="blue" onClick={onModify}>
              Modify
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};
