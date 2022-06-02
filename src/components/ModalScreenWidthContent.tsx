import styled from "styled-components";

export default function ModalScreenWidthContent() {
  return (
    <Wrapper>
      <Title>We are sorry :(</Title>
      <div>
        <Text>
          In the future, we’re going to support mobile and smaller screen
          experiences, for now, please{" "}
          <b>
            use a device of at least the size of a phone in landscape mode (512
            px)
          </b>
        </Text>
        <Text>
          Rotate your phone to have a better experience and keep enjoying Animal
          Cardom.
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
  height: 95vh;
  text-align: center;
  width: 95vw;
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
