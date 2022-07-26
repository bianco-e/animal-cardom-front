import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  > .earned-coins {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-top: 4px;
    > img {
      margin-left: 4px;
    }
  }
`
