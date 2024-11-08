import { TooltipDirection, TooltipWrapper } from "./styled"

interface IProps {
  direction?: TooltipDirection
  description: string
  title: string
}

export default function Tooltip({ direction = TooltipDirection.TOP, description, title }: IProps) {
  return (
    <TooltipWrapper className="tooltip" $direction={direction}>
      <div className="description-container">
        <span>{description}</span>
      </div>
      <hr />
      <div className="title-container">
        <span>{title}</span>
      </div>
    </TooltipWrapper>
  )
}
