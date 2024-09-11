import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './modal-provider';
import './modal.scss';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;
const Modal = () => {
  const {
    showModal,
    openModal,
    closeModal,
    modalContent,
    modalNotDismissible,
  } = useContext(ModalContext) as any;

  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      closeModal();
    }
  };
  const handleCloseModal = () => {
    //if (modalNotDismissible) return;
    closeModal();
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  if (showModal) {
    return createPortal(
      <div className={showModal ? 'modal show' : 'modal'}>
        <div className='modal__content' onClick={(e) => e.stopPropagation()}>
          <div className='modal__close' onClick={handleCloseModal}>
            &times;
          </div>
          <div className='modal__body'>{modalContent}</div>
        </div>
      </div>,
      modalRoot
    );
  }
  return null;
};

export default Modal;
