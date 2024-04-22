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
import { type customer, type credit_card } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { api } from '~/utils/api';

export const AddCreditCardFormModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const ctx = api.useUtils();

  const { isOpen, onClose } = props;

  const toast = useToast();

  type AddCreditCardForm = Omit<credit_card, 'cc_id'>; // How do be sure it is associated with same Cust_ID?

  const { control, handleSubmit, reset } = useForm<AddCreditCardForm>();

  const { mutate, isPending } = api.CreditCard.create.useMutation({
    onSuccess: () => {
      void ctx.CreditCard.getAll.invalidate();
    },
    onError: () => {
      toast({
        title: 'Unable to add Credit Card',
        status: 'error'
      });
    }
  });

  const addCreditCard = (data: AddCreditCardForm) => {
    const userString = localStorage.getItem('customer');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: customer = JSON.parse(userString ?? '');
    const newData = {
      ...data,
      cust_id: user.cust_id,
      expiry_date: data.expiry_date ? Date() : null
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
            <Heading>Add Credit Card</Heading>
            <CloseButton onClick={onClose} />
          </Flex>
        </ModalHeader>
        <form onSubmit={handleSubmit(addCreditCard)}>
          <ModalBody>
            <Container>
              <FormLabel width="100%">
                First Name
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="First Name"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Last Name
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Last Name"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Number
                <Controller
                  name="number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Card Number"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Security Number
                <Controller
                  name="security_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="Security Number"
                      value={field.value ?? ''}
                    />
                  )}
                />
              </FormLabel>
              <FormLabel width="100%">
                Expiry Date
                <Controller
                  name="expiry_date"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoComplete="none"
                      {...field}
                      placeholder="YYYY-MM-DD"
                      value={field.value?.toISOString()} // I think this is a problem becasue it has to be date format
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
                Add Credit Card
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
