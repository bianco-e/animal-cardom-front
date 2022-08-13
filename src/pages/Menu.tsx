import { useEffect, useState } from "react"
import styled from "styled-components"
import Card from "../components/Card"
import MenuLayout from "../components/MenuLayout"
import ReleaseNotes from "../components/ReleaseNotes"
import Spinner from "../components/Spinner"
import { IAnimal } from "../interfaces"
import { getNewestAnimals } from "../queries/animalsCards"
import { BREAKPOINTS } from "../utils/constants"

export default function Menu() {
  const [newestAnimals, setNewestAnimals] = useState<IAnimal[]>([])

  const fetchNewestAnimals = async () => {
    const animalsRes = await getNewestAnimals()
    if (animalsRes.error) return
    setNewestAnimals(animalsRes.animals)
  }

  useEffect(() => {
    fetchNewestAnimals()
  }, [])

  return (
    <MenuLayout>
      <>
        <Wrapper>
          <Title>Newest animals</Title>
          {!(newestAnimals.length > 0) ? (
            <Spinner />
          ) : (
            <div>
              {newestAnimals.map(card => (
                <Card {...card} key={card.name} opacityForPreview="1" />
              ))}
            </div>
          )}
        </Wrapper>
        <ReleaseNotes />
      </>
    </MenuLayout>
  )
}

const Wrapper = styled.div`
  align-items: center;
  background-image: url("/images/welcome-background.png");
  background-size: cover;
  background-position: bottom;
  border-radius: 4px;
  box-shadow: 0 0 10px 10px rgba(95, 57, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  padding: 32px 64px;
  position: relative;
  width: 85%;
  > div {
    align-items: center;
    display: flex;
    justify-content: space-around;
    padding: 45px 0 15px 0;
    > button {
      cursor: default;
      height: 280px;
      margin-bottom: 16px;
      width: calc(30% - 40px);
      > .animal-name {
        font-size: 18px;
      }
      &:hover {
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
        transform: none;
      }
    }
  }
  ${BREAKPOINTS.MOBILE} {
    > div {
      width: 100%;
      > button {
        height: 190px;
        width: 33%;
        > .animal-name {
          font-size: 15px;
        }
      }
    }
  }
`

const Title = styled.h2`
  font-weight: bold;
  font-size: ${({ theme }) => theme.$4};
  margin: 0;
`
