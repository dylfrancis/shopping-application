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
  useToast
} from '@chakra-ui/react';
import { type customer, type customer_address } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { api } from '~/utils/api';

export const AddAddressFormModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const ctx = api.useUtils();

  const { isOpen, onClose } = props;

  const toast = useToast();

  type AddAddressForm = Omit<customer_address, 'cust_address_id'>;

  const { control, handleSubmit, reset } = useForm<AddAddressForm>();

  const { mutate, isPending } = api.address.create.useMutation({
    onSuccess: () => {
      void ctx.address.getAll.invalidate();
    },
    onError: () => {
      toast({
        title: 'Unable to add address',
        status: 'error'
      });
    }
  });

  const addAddress = (data: AddAddressForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const customer: customer = JSON.parse(
      localStorage.getItem('customer') ?? ''
    );
    const newData = {
      ...data,
      cust_id: customer.cust_id
    };
    mutate(newData);
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading>Add Address</Heading>
            <CloseButton onClick={onClose} />
          </Flex>
        </ModalHeader>
        <form onSubmit={handleSubmit(addAddress)}>
          <ModalBody>
            <Container>
              <FormLabel width="100%">
                Street Number
                <Controller
                  name="street_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Street Number"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Street Name
                <Controller
                  name="street_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Street Name"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                City
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="City"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                State
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="State"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Zip
                <Controller
                  name="zip"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Zip"
                      value={field.value ?? ''}
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
                Add Address
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
