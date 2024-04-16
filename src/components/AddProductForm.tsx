import { Center, Modal, ModalBody } from '@chakra-ui/react';

export const AddProductForm = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <Center></Center>
      </ModalBody>
    </Modal>
  );
};
