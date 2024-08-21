import { createContext } from 'react';
import Modal from './modal';
import { useModal } from '../services/hooks/use-modal';

//type ModalContextProps = {
//  isOpen: boolean;
//  setIsOpen: any;
//};

//* const { Provider } = (ModalContext = React.createContext<any>(null));
const ModalContext = createContext<any>(null);

const ModalProvider = ({ children }: any) => {
  const {
    showModal,
    openModal,
    closeModal,
    modalContent,
    modalNotDismissible,
  } = useModal();

  return (
    <ModalContext.Provider
      value={{
        showModal,
        openModal,
        closeModal,
        modalContent,
        modalNotDismissible,
      }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
