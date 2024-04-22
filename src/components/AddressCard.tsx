import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import { type customer_address } from '@prisma/client';
import { api } from '~/utils/api';

export const AddressCard = (props: {
  customer_address: customer_address;
  onModify?: () => void;
  id: number;
}) => {
  const { customer_address, id, onModify } = props;

  const toast = useToast();

  const ctx = api.useUtils();

  const { mutate, isPending } = api.address.delete.useMutation({
    onSuccess: () => {
      void ctx.address.getAll.invalidate();
    },
    onError: () => {
      toast({
        title: 'Unable to delete Address',
        status: 'error'
      });
    }
  });

  const deleteAddress = (id: number) => {
    mutate({ id: id });
  };

  return (
    <Card key={id}>
      <CardBody>
        <Stack>
          <Text>
            {customer_address.street_number +
              ' ' +
              customer_address.street_name}
          </Text>
          <Text>{customer_address.city + ' ' + customer_address.state}</Text>
          <Text>{customer_address.zip}</Text>
          <Divider></Divider>
          <ButtonGroup spacing={4} alignItems="center" justifyContent="center">
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => deleteAddress(id)}
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
