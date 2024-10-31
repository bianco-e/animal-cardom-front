import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { CloseButton, ModalContainer, ModalOverlay } from "./styled"
const modalRoot = document.getElementById("modal-root")

interface IProps {
  closeModal: () => void
  children?: JSX.Element
  forSpinner?: boolean
  withCloseButton?: boolean
}

export default function Modal({
  closeModal,
  children,
  forSpinner,
  withCloseButton = true,
}: IProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (contentRef.current) {
      const { left, top, right, bottom } = contentRef.current.getBoundingClientRect()
      const { clientX, clientY } = e
      const isClickingOut =
        clientX < left || clientX > right || clientY < top || clientY > bottom
      if (isClickingOut) {
        closeModal()
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, []) //eslint-disable-line

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, []) //eslint-disable-line

  return createPortal(
    <ModalOverlay>
      <ModalContainer $forSpinner={forSpinner} ref={contentRef}>
        {children}
        {!forSpinner && withCloseButton ? (
          <CloseButton onClick={closeModal}>x</CloseButton>
        ) : null}
      </ModalContainer>
    </ModalOverlay>,
    modalRoot as HTMLElement
  )
}
