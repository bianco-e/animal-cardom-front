import styled from "styled-components";

export default function ModalScreenWidthContent() {
  return (
    <Wrapper>
      <Title>We are sorry :(</Title>
      <div>
        <Text>Animal Cardom cannot be used from a vertical phone.</Text>
        <Text>
          Please rotate your phone to have a better experience and keep enjoying
          Animal Cardom.
        </Text>
        <Text>Thanks!</Text>
      </div>
      <img
        alt="phone-rotation"
        src="/images/rotate-screen-image.png"
        width={200}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 85vh;
  text-align: center;
  > div {
    display: flex;
    flex-direction: column;
  }
`;
const Title = styled.span`
  font-size: 26px;
  font-weight: bold;
`;
const Text = styled.span`
  font-size: 18px;
  margin: 15px 0;
`;
