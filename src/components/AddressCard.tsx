import {
    Button,
    Card,
    CardBody,
    Divider,
    Heading,
    Stack,
    Text
  } from '@chakra-ui/react';
  import { type customer_address } from '@prisma/client';
  import { type Key } from 'react';

  export const StaffProductCard = (props: {
    product: ;
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
            <Text>{(product.price)}</Text>
            <Divider></Divider>
            <Button colorScheme="red" onClick={onDelete}>
              Delete
            </Button>
          </Stack>
        </CardBody>
      </Card>
    );
  };
