import {
    Button,
    Card,
    CardBody,
    Divider,
    Heading,
    Stack,
    Text
  } from '@chakra-ui/react';
  import { type credit_card } from '@prisma/client';
  import { type Key } from 'react';

  export const CreditCardCard = (props: {
    Credit_Card: credit_card;
    key: Key;
    onDelete?: () => void;
  }) => {
    const { Credit_Card, key, onDelete } = props;
    return (
      <Card key={key}>
        <CardBody>
          <Stack>
            <Text>{Credit_Card.number}</Text>
            <Text>{Credit_Card.firstname + " " + Credit_Card.lastname}</Text>
            <Text>{Credit_Card.zip}</Text>
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