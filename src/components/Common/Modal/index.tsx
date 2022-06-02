import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseButton, ModalContainer, ModalOverlay } from "./styled";
const modalRoot = document.getElementById("modal-root");

interface IProps {
  closeModal: () => void;
  children?: JSX.Element;
  forSpinner?: boolean;
  withCloseButton?: boolean;
}

export default function Modal({
  closeModal,
  children,
  forSpinner,
  withCloseButton = true,
}: IProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (contentRef.current) {
      const isClickingOut =
        clientX >
          contentRef.current.offsetLeft + contentRef.current.offsetWidth ||
        clientX < contentRef.current.offsetLeft ||
        clientY >
          contentRef.current.offsetTop + contentRef.current.offsetHeight ||
        clientY < contentRef.current.offsetTop;
      if (isClickingOut) {
        closeModal();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []); //eslint-disable-line

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []); //eslint-disable-line

  return modalRoot
    ? ReactDOM.createPortal(
        <ModalOverlay>
          <ModalContainer forSpinner={forSpinner} ref={contentRef}>
            {children}
            {!forSpinner && withCloseButton ? (
              <CloseButton onClick={closeModal}>Close</CloseButton>
            ) : null}
          </ModalContainer>
        </ModalOverlay>,
        modalRoot
      )
    : null;
}
