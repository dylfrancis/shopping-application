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
  import { type customer_address as Address } from '@prisma/client';
  import { Controller, useForm } from 'react-hook-form';
  import { api } from '~/utils/api';
  
  export const ModifyAddressFormModal = (props: {
    isOpen: boolean;
    onClose: () => void;
    address: Address;
  }) => {
    const ctx = api.useUtils();
  
    const { isOpen, onClose, address } = props;
  
    const toast = useToast();
  
    const { control, handleSubmit } = useForm<Address>({
      defaultValues: address
    });
  
    const { mutate, isPending } = api.Address.update.useMutation({
      onSuccess: () => {
        void ctx.Address.getAll.invalidate();
      },
      onError: () => {
        toast({
          title: 'Unable to modify address',
          status: 'error'
        });
      }
    });
  
    const modifyAddress = (data: Address) => {
      const newData = {
        ...data,
      };
      mutate(newData);
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading>Modify Address</Heading>
              <CloseButton onClick={onClose} />
            </Flex>
          </ModalHeader>
          <form onSubmit={handleSubmit(modifyAddress)}>
            <ModalBody>
              <Container>
                <FormLabel width="100%">
                  Street Number
                  <Controller
                    name = "street_number"
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
                    name = "street_name"
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
                    name = "city"
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
                    name = "state"
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
                    name = "city"
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
                  Modify Address
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };