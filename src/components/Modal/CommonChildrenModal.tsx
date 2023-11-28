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

// types
import type { ChildrenInterface } from "@/types";

interface CommonModalProps extends ChildrenInterface {
  isOpen: boolean;

  title: string;

  onModalCloseButtonClickEvent: () => void;
}

export const CommonChildrenModal = ({
  isOpen,
  title,
  children,
  onModalCloseButtonClickEvent,
}: CommonModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onModalCloseButtonClickEvent}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" onClick={onModalCloseButtonClickEvent}>
            CLOSE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
