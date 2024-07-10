// @ts-nocheck

import { useModal } from '../../context/Modal';

// Types
import { CSSModule } from '../../utils/types';

interface OpenModalButtonComponent {
  modalComponent: JSX.Element;
  buttonText?: JSX.Element | string;
  onButtonClick?: () => void;
  onModalClose?: () => void;
  className?: CSSModule | string;
}

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className
}: OpenModalButtonComponent) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    e.stopPropagation();
    // console.log("onClick")
    if (onModalClose) {
      // console.log("onModalClose")
      setOnModalClose(() => onModalClose);
    }
    setModalContent(modalComponent);
    // if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button className={className} onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;