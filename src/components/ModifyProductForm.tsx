import {
  Button,
  CloseButton,
  Container,
  Flex,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { type product as Product } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { api } from '~/utils/api';

export const ModifyProductFormModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}) => {
  const ctx = api.useUtils();

  const { isOpen, onClose, product } = props;

  const toast = useToast();

  const { control, handleSubmit } = useForm<Product>({
    defaultValues: product
  });

  const { mutate, isPending } = api.product.update.useMutation({
    onSuccess: () => {
      void ctx.product.getAll.invalidate();
    },
    onError: () => {
      toast({
        title: 'Unable to modify product',
        status: 'error'
      });
    }
  });

  const modifyProduct = (data: Product) => {
    const newData = {
      ...data,
      price: data.price ? Number(data.price) : null
    };
    mutate(newData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading>Modify Product</Heading>
            <CloseButton onClick={onClose} />
          </Flex>
        </ModalHeader>
        <form onSubmit={handleSubmit(modifyProduct)}>
          <ModalBody>
            <Container>
              <FormLabel width="100%">
                Name
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Product Name"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Price
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      format={() =>
                        field.value ? `$${Number(field.value)}` : ''
                      }
                      value={
                        isNaN(Number(field.value))
                          ? undefined
                          : Number(field.value)
                      }
                    >
                      <NumberInputField
                        autoComplete="none"
                        placeholder="Product Price"
                      />
                    </NumberInput>
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Category
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Product Category"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Type
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Product Type"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Brand
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Product Brand"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Size
                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Product Size"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Description
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Product Description"
                      value={field.value ?? ''}
                      rows={3}
                    />
                  )}
                />
              </FormLabel>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Flex
              gap={4}
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Button
                colorScheme="red"
                flex={1}
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                flex={1}
                isLoading={isPending}
                type="submit"
              >
                Modify Product
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
