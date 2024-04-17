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
  
  export const CustProductCard = (props: {
    product: product;
    key: Key;
    onDelete?: () => void; //Will change to be add to cart
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
            <Button colorScheme="yellow">
              Add to Cart
            </Button>
          </Stack>
        </CardBody>
      </Card>
    );
  };