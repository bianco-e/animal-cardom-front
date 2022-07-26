import { Wrapper } from "./styled"

interface IProps {
  height?: string
  width?: string
}
export default function AnimatedPlaceholder({ height, width }: IProps) {
  return <Wrapper height={height} width={width}></Wrapper>
}
