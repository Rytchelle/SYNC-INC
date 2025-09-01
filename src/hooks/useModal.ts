import { useState } from 'react';

interface UseModalReturn {
  isOpen: boolean;
  selectedItem: any;
  openModal: (item?: any) => void;
  closeModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openModal = (item?: any) => {
    setSelectedItem(item || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return {
    isOpen,
    selectedItem,
    openModal,
    closeModal
  };
};
