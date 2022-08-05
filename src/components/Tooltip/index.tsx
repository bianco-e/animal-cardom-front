import { TooltipWrapper } from "./styled"

export type Direction = "TOP" | "BOTTOM" | "BOTTOM-LEFT" | "BOTTOM-RIGHT"

interface IProps {
  direction?: Direction
  description: string
  title: string
}

export default function Tooltip({ direction = "TOP", description, title }: IProps) {
  return (
    <TooltipWrapper className="tooltip" direction={direction}>
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
