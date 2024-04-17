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

  export const AddressCard = (props: {
    customer_address: customer_address;
    key: Key;
    onDelete?: () => void;
  }) => {
    const { customer_address, key, onDelete } = props;
    return (
      <Card key={key}>
        <CardBody>
          <Stack>
            <Text>{customer_address.street_number + " " + customer_address.street_name}</Text>
            <Text>{customer_address.city + " " + customer_address.state}</Text>
            <Text>{customer_address.zip}</Text>
            <Divider></Divider>
            <Button colorScheme="red" onClick={onDelete}>
              Delete
            </Button>
            <Button colorScheme="blue" /*onClick={MODIFY FUNCTION}*/>
              Edit
            </Button>
          </Stack>
        </CardBody>
      </Card>
    );
  };
