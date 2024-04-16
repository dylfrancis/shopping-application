import { Center, Input, Modal, ModalBody } from '@chakra-ui/react';
import { type product } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';

export const AddProductForm = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { isOpen, onClose } = props;

  const { control } = useForm<product>();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <Center></Center>
      </ModalBody>
    </Modal>
  );
};
