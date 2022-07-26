import { CardThumbnail } from "./styled"

interface IProps {
  disabled: boolean
  name: string
  image: string
}

export default function Thumbnail({ image, disabled, name }: IProps) {
  return (
    <CardThumbnail
      isCardSelected={false}
      isParalyzed={false}
      opacity={disabled ? "0.5" : "1"}>
      <span className="animal-name spaced-title">{name}</span>
      <img alt={name} className="animal-picture" src={image} />
    </CardThumbnail>
  )
}
