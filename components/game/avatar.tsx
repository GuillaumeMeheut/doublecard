import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { AppImage, AppText } from 'components'

type Props = {
  pseudo: string
  img: string
  turn: boolean
}

export const AvatarGame: FunctionComponent<Props> = ({ pseudo, img, turn }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box position="relative">
        {turn ? (
          <Box
            position="absolute"
            width="100%"
            height="100%"
            rounded="full"
            backgroundColor="black"
            opacity=".5"
            zIndex={5}
          />
        ) : (
          <></>
        )}
        <AppImage src={img} alt={pseudo} width={'50px'} rounded="full" />
      </Box>

      <AppText>{pseudo}</AppText>
    </Box>
  )
}
