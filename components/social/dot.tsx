import { FunctionComponent } from 'react'
import { Color } from 'theme'

type Props = {
  status: string
}

export const Dot: FunctionComponent<Props> = ({ status }) => {
  const returnColorStatus = (status: string): string => {
    switch (status) {
      case 'available':
        return Color.green
      case 'away':
        return Color.red
      case 'absent':
        return Color.yellow
      default:
        return Color.green
    }
  }
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="5" fill={returnColorStatus(status)} />
    </svg>
  )
}
