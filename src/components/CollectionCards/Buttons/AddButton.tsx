import { CardInnerButton } from "../styled"

interface IProps {
  onClick: () => void
}

export default function AddButton({ onClick }: IProps) {
  return (
    <CardInnerButton className="add spaced-title" onClick={onClick}>
      <img alt="add" src="/icons/plus-icon.svg" width={14} />
      ADD
    </CardInnerButton>
  )
}
