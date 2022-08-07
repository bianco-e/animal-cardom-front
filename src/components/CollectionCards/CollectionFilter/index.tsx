import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux-hooks"
import { IAnimal } from "../../../interfaces"
import { getFilteredAnimalsCards } from "../../../queries/animalsCards"
import { sortCardsAlphabetically } from "../../../utils"
import Dropdown from "../../Common/Dropdown"
import { DropdownsContainer, Text, Wrapper } from "./styled"

interface IProps {
  setCardsToShow: (cards: IAnimal[]) => void
}

export default function CollectionFilter({ setCardsToShow }: IProps) {
  const [speciesFilter, setSpeciesFilter] = useState<string>()
  const [skillTypeFilter, setSkillTypeFilter] = useState<string>()
  const [owningFilter, setOwningFilter] = useState<boolean | undefined>()
  const { owned_cards: ownedCards } = useAppSelector(({ auth }) => auth.user)

  useEffect(() => {
    const sendingOwnedCards = owningFilter ? ownedCards.map(card => card) : undefined
    const sendingOwnedCardsToFilter =
      owningFilter === false ? ownedCards.map(card => card) : undefined
    getFilteredAnimalsCards(
      speciesFilter,
      skillTypeFilter,
      sendingOwnedCards,
      sendingOwnedCardsToFilter
    ).then(res => {
      if (res && res.animals) {
        setCardsToShow(sortCardsAlphabetically(res.animals))
      }
    })
  }, [speciesFilter, skillTypeFilter, owningFilter]) //eslint-disable-line

  const speciesDropdownOptions = [
    {
      text: "Species",
      fn: () => setSpeciesFilter(""),
    },
    {
      text: "🦈",
      fn: () => setSpeciesFilter("🦈"),
    },
    {
      text: "🐸",
      fn: () => setSpeciesFilter("🐸"),
    },
    {
      text: "🐺",
      fn: () => setSpeciesFilter("🐺"),
    },
    {
      text: "🦂",
      fn: () => setSpeciesFilter("🦂"),
    },
    {
      text: "🦅",
      fn: () => setSpeciesFilter("🦅"),
    },
    {
      text: "🦎",
      fn: () => setSpeciesFilter("🦎"),
    },
  ]

  const ownedDropdownOptions = [
    {
      text: "Owning",
      fn: () => setOwningFilter(undefined),
    },
    {
      text: "Owned",
      fn: () => setOwningFilter(true),
    },
    {
      text: "Not owned",
      fn: () => setOwningFilter(false),
    },
  ]

  const skillDropdownOptions = [
    {
      text: "Skill",
      fn: () => setSkillTypeFilter(""),
    },
    {
      text: "Bleed",
      fn: () => setSkillTypeFilter("bleed"),
    },
    {
      text: "Blind",
      fn: () => setSkillTypeFilter("blind"),
    },
    {
      text: "Buff",
      fn: () => setSkillTypeFilter("buff"),
    },
    {
      text: "Dodge",
      fn: () => setSkillTypeFilter("dodge"),
    },
    {
      text: "Extra damage",
      fn: () => setSkillTypeFilter("extra_damage"),
    },
    {
      text: "Healing",
      fn: () => setSkillTypeFilter("healing"),
    },
    {
      text: "Instant kill",
      fn: () => setSkillTypeFilter("instant_kill"),
    },
    {
      text: "Paralyze",
      fn: () => setSkillTypeFilter("paralyze"),
    },
    {
      text: "Poison",
      fn: () => setSkillTypeFilter("poison"),
    },
    {
      text: "Reflect",
      fn: () => setSkillTypeFilter("reflect"),
    },
    {
      text: "Untargeteable",
      fn: () => setSkillTypeFilter("untargeteable"),
    },
    {
      text: "Other",
      fn: () => setSkillTypeFilter("other"),
    },
  ]

  return (
    <Wrapper>
      <Text>Filter by</Text>
      <DropdownsContainer>
        <Dropdown closedText="Species" options={speciesDropdownOptions} width="200px" />
        <Dropdown closedText="Owning" options={ownedDropdownOptions} width="200px" />
        <Dropdown closedText="Skill" options={skillDropdownOptions} width="200px" />
      </DropdownsContainer>
    </Wrapper>
  )
}
