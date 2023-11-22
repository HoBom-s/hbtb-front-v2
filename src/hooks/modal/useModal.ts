import { useState } from "react";

interface UseModal {
  isModalOpen: boolean;

  handleModalOpenStateChange: () => void;
}

/**
 * Modal Hook
 *      Modal의 State를 컨트롤 하기 위한 hook
 *
 * @example
 *      const { isModalOpen, handleModalOpenStateChange } = useModal();
 *
 * @returns {UseModal}
 */
export const useModal = (): UseModal => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpenStateChange = () => {
    setIsModalOpen((prevModalOpen: boolean) => !prevModalOpen);
  };

  return {
    isModalOpen,
    handleModalOpenStateChange,
  };
};
