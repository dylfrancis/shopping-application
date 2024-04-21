import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Divider,
    Heading,
    Stack,
    Text,
    useToast
  } from '@chakra-ui/react';
  import { type credit_card } from '@prisma/client';
  import { api } from '~/utils/api';

  export const CreditCardCard = (props: {
    Credit_Card: credit_card;
    onModify?: () => void;
    id: number;
  }) => {
    const { Credit_Card, id, onModify } = props;

    const toast = useToast();

    const ctx = api.useUtils();

    const { mutate, isPending } = api.CreditCard.delete.useMutation({
        onSuccess: () => {
          void ctx.CreditCard.getAll.invalidate();
        },
        onError: () => {
          toast({
            title: 'Unable to delete Credit Card',
            status: 'error'
          });
        }
      });
    
      const deleteCreditCard = (id: number) => {
        mutate({ id: id });
      };
    
    return (
      <Card key={id}>
        <CardBody>
          <Stack>
            <Text>{Credit_Card.number}</Text>
            <Text>{Credit_Card.firstname + " " + Credit_Card.lastname}</Text>
            <Text>{Credit_Card.zip}</Text>
            <Divider></Divider>
            <ButtonGroup spacing={4} alignItems="center" justifyContent="center">
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => deleteCreditCard(id)}
              isLoading={isPending}
            >
              Delete
            </Button>
            <Button colorScheme="blue" onClick={onModify}>
              Modify
            </Button>
          </ButtonGroup>
          </Stack>
        </CardBody>
      </Card>
    );
  };