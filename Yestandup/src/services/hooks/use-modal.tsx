import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalNotDismissible, setModalNotDismissible] = useState(false);

  const openModal = (content: string, notDissmissible = false) => {
    setShowModal(true);
    if (content) {
      setModalContent(content);
      setModalNotDismissible(notDissmissible);
    }
  };

  const closeModal = () => {
    //history.replaceState({}, document.title, window.location.href.split('#')[0]);
    setShowModal(false);
  };

  return {
    showModal,
    openModal,
    closeModal,
    modalContent,
    modalNotDismissible,
  };
};
