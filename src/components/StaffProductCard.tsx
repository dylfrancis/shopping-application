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
import { type product } from '@prisma/client';
import { api } from '~/utils/api';
import { formatCurrency } from '~/utils/general';

export const StaffProductCard = (props: {
  product: product;
  onModify?: () => void;
  id: number;
}) => {
  const { product, id, onModify } = props;

  const toast = useToast();

  const ctx = api.useUtils();

  const { mutate, isPending } = api.product.delete.useMutation({
    onSuccess: () => {
      void ctx.product.getAll.invalidate();
    },
    onError: () => {
      toast({
        title: 'Unable to delete product',
        status: 'error'
      });
    }
  });

  const deleteProduct = (id: number) => {
    mutate({ id: id });
  };

  return (
    <Card key={id}>
      <CardBody>
        <Stack>
          <Heading>{product.name}</Heading>
          <Text>{product.description}</Text>
          <Text>{formatCurrency(product.price)}</Text>
          <Divider></Divider>
          <ButtonGroup spacing={4} alignItems="center" justifyContent="center">
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => deleteProduct(id)}
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
