import style from './Avatar.module.css'

interface AvatarProps {
  hasBorder?: boolean;
  src: string;
}

export function Avatar({ hasBorder = true, src }: AvatarProps) {
  return (
    <img
      className={ hasBorder ? style.avatarWithBorder : style.avatar }
      src={ src }
    />
  )
}
