import { PlantThumbnail } from "./styled"

interface IProps {
  disabled: boolean
  image: string
  name: string
}

export default function Thumbnail({ disabled, image, name }: IProps) {
  return (
    <PlantThumbnail opacity={disabled ? "0.5" : "1"}>
      <span className="spaced-title">{name}</span>
      <img alt={name} src={image} />
    </PlantThumbnail>
  )
}
