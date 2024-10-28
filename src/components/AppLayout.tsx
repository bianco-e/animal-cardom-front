import { Outlet, useLocation } from "react-router-dom"
import useWindowDimensions from "../hooks/useWindowDimensions"
import Modal from "./Common/Modal"
import ModalScreenWidthContent from "./ModalScreenWidthContent"

export default function AppLayout() {
  const dimensions = useWindowDimensions()
  const location = useLocation()
  const showScreenSizeAlert =
    dimensions && dimensions.width <= 512 && location.pathname !== "/analytics"

  return (
    <>
      {showScreenSizeAlert ? (
        <Modal closeModal={() => {}} withCloseButton={false}>
          <ModalScreenWidthContent />
        </Modal>
      ) : null}
      <Outlet />
    </>
  )
}
