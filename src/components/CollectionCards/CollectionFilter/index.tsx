import { useEffect, useState } from "react"
import { FiltersData, Animal } from "../../../interfaces"
import { getFilteredAnimals } from "../../../queries/animalsCards"
import Dropdown from "../../Common/Dropdown"
import { DropdownsContainer, Text, Wrapper } from "./styled"
import { parseAnimalsFromDB } from "../../../utils"

interface IProps {
  setCardsToShow: (cards: Animal[]) => void
  filtersData: FiltersData
}

export default function CollectionFilter({ setCardsToShow, filtersData }: IProps) {
  const [speciesFilter, setSpeciesFilter] = useState<number | null>(null)
  const [habitatFilter, setHabitatFilter] = useState<number | null>(null)
  const [skillTypeFilter, setSkillTypeFilter] = useState<number | null>(null)

  useEffect(() => {
    getFilteredAnimals(habitatFilter, speciesFilter, skillTypeFilter).then(animals =>
      setCardsToShow(parseAnimalsFromDB(animals))
    )
  }, [habitatFilter, speciesFilter, skillTypeFilter]) //eslint-disable-line

  const speciesDropdownOptions = [
    {
      text: "Species",
      fn: () => setSpeciesFilter(null),
    },
  ].concat(
    filtersData.species.map(species => ({
      text: species.name,
      fn: () => setSpeciesFilter(species.id),
    }))
  )

  const habitatDropdownOptions = [
    {
      text: "Habitat",
      fn: () => setHabitatFilter(null),
    },
  ].concat(
    filtersData.habitats.map(habitat => ({
      text: habitat.name,
      fn: () => setHabitatFilter(habitat.id),
    }))
  )

  const skillDropdownOptions = [
    {
      text: "Skill",
      fn: () => setSkillTypeFilter(null),
    },
  ].concat(
    filtersData.skillTypes.map(skillType => ({
      text: skillType.name,
      fn: () => setSkillTypeFilter(skillType.id),
    }))
  )

  return (
    <Wrapper>
      <Text>Filter by</Text>
      <DropdownsContainer>
        <Dropdown closedText="Species" options={speciesDropdownOptions} width="160px" />
        <Dropdown closedText="Habitat" options={habitatDropdownOptions} width="160px" />
        <Dropdown closedText="Skill" options={skillDropdownOptions} width="160px" />
      </DropdownsContainer>
    </Wrapper>
  )
}
