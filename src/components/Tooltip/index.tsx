import { TooltipDirection, TooltipWrapper } from "./styled"

interface IProps {
  direction?: TooltipDirection
  description: string
  title: string
  size?: "SM" | "MD"
}

export default function Tooltip({
  direction = TooltipDirection.TOP,
  description,
  title,
  size = "SM",
}: IProps) {
  return (
    <TooltipWrapper
      $size={size}
      className="tooltip"
      $direction={direction}>
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
