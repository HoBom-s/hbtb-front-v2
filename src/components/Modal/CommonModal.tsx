// chakra
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";

interface CommonModalProps {
  isOpen: boolean;

  title: string;

  bodyContents: string;

  onModalCloseButtonClickEvent: () => void;
}

export const CommonModal = ({
  isOpen,
  title,
  bodyContents,
  onModalCloseButtonClickEvent,
}: CommonModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onModalCloseButtonClickEvent}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{bodyContents}</ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" onClick={onModalCloseButtonClickEvent}>
            CLOSE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
