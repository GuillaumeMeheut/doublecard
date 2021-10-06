import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { AppImage, AppText } from 'components'

type Props = {
  pseudo: string
  img: string
}

export const AvatarGame: FunctionComponent<Props> = ({ pseudo, img }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <AppImage src={img} alt={pseudo} width={'50px'} />
      <AppText>{pseudo}</AppText>
    </Box>
  )
}
