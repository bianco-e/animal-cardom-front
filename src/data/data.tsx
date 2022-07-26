import { ITerrain } from "../interfaces"

export const CARD_ICONS = {
  ATTACK: "/images/icons/attack-icon.png",
  DEFENSE: "/images/icons/defense-icon.png",
  FURY: "/images/icons/fury-icon.png",
  BLOOD: "/images/icons/blood-icon.png",
  LIFE: "/images/svg/life-icon.svg",
  POISON: "/images/svg/poison-life-icon.svg",
  MISSING: "/images/svg/missing-chance-icon.svg",
}

export const terrains: ITerrain[] = [
  {
    name: "Neutral",
    color: "#000",
    speciesToBuff: "",
    image: "/images/terrains/neutral.webp",
    getRequiredXp: (currentXp: number) => (currentXp < 1350 ? currentXp : 900),
  },
  {
    name: "Swamp",
    color: "#228B22",
    speciesToBuff: "🐸",
    image: "/images/terrains/swamp.webp",
    getRequiredXp: (currentXp: number) => 1350,
  },
  {
    name: "Desert",
    color: "#DEB887",
    speciesToBuff: "🦂",
    image: "/images/terrains/desert.webp",
    getRequiredXp: (currentXp: number) => 1800,
  },
  {
    name: "Mountain",
    color: "#C0C0C0",
    speciesToBuff: "🦅",
    image: "/images/terrains/mountain.webp",
    getRequiredXp: (currentXp: number) => 2250,
  },
  {
    name: "Sea",
    color: "#87CEEB",
    speciesToBuff: "🦈",
    image: "/images/terrains/sea.webp",
    getRequiredXp: (currentXp: number) => 2700,
  },
  {
    name: "Forest",
    color: "#2E8B57",
    speciesToBuff: "🦎",
    image: "/images/terrains/forest.webp",
    getRequiredXp: (currentXp: number) => 3150,
  },
  {
    name: "Jungle",
    color: "#006400",
    speciesToBuff: "🐺",
    image: "/images/terrains/jungle.webp",
    getRequiredXp: (currentXp: number) => 3600,
  },
]
