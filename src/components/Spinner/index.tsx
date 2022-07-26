import { SpinnerWrapper, Wrapper } from "./styled"

export default function Spinner() {
  return (
    <SpinnerWrapper>
      <Wrapper className="lds-circle">
        <div></div>
      </Wrapper>
    </SpinnerWrapper>
  )
}
