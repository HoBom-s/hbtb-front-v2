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

interface CommonConfirmModalProps {
  isOpen: boolean;

  title: string;

  contents: string;

  onModalOkButtonClickEvent: () => void;

  onModalCloseButtonClickEvent: () => void;
}

export const CommonConfirmModal = ({
  isOpen,
  title,
  contents,
  onModalOkButtonClickEvent,
  onModalCloseButtonClickEvent,
}: CommonConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onModalCloseButtonClickEvent}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{contents}</ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="orange"
            onClick={onModalOkButtonClickEvent}
          >
            OK
          </Button>
          <Button
            ml={3}
            colorScheme="orange"
            onClick={onModalCloseButtonClickEvent}
          >
            CLOSE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
