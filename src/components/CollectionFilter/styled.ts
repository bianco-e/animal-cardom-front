import styled from "styled-components"

export const Wrapper = styled.div`
  align-items: center;
  background-image: url("/images/welcome-background.png");
  background-size: cover;
  background-position: bottom;
  border-radius: 5px;
  box-shadow: 0 0 10px 10px rgba(95, 57, 0, 0.2);
  display: flex;
  justify-content: space-between;
  min-height: 80px;
  padding: 15px 60px;
  position: relative;
  width: 75%;
`
export const DropdownsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 75%;
`
export const Text = styled.span`
  color: ${({ theme }) => theme.light_brown};
  font-weight: bold;
  font-size: 20px;
`
