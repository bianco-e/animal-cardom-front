import styled from "styled-components";

interface IProps {
  coins?: number;
}

export default function CoinsViewer({ coins }: IProps) {
  return (
    <Wrapper>
      <img alt="coins" src="/images/icons/coins.png" width={24} />
      <span>{coins && coins}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.primary_brown};
  border-radius: 0 0 56px 56px;
  border: 2px solid ${({ theme }) => theme.secondary_brown};
  border-top: 0;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
  display: flex;
  height: 35px;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 180px;
  z-index: 90;
  > span {
    font-size: 12px;
    font-weight: bold;
    margin-left: 10px;
  }
`;
