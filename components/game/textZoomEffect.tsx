import React, { FunctionComponent } from 'react'
import { Box, color } from '@chakra-ui/react'
import { AppImage, AppText, MotionBox } from 'components'
import { CardDuno, User } from 'types'
import { CardSize, Color, ColorHover } from 'theme'

type Props = {
  text: string
  textColor: string
  bgColor: string
}

export const TextZoomEffect: FunctionComponent<Props> = ({
  text,
  textColor,
  bgColor,
}) => {
  const animDuration = 1

  return (
    <MotionBox
      position="fixed"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      zIndex="10"
      animate={{
        display: 'none',
      }}
      transition={{ delay: animDuration }}
    >
      <MotionBox
        position="fixed"
        height="100vh"
        width="100vw"
        zIndex="10"
        backgroundColor={bgColor}
        animate={{
          opacity: [0, 0.7, 0.7, 0],
        }}
        transition={{ duration: animDuration }}
      />
      <MotionBox
        backgroundColor={bgColor}
        width="100%"
        zIndex="11"
        padding="10px 0px"
        initial={{
          scale: 5,
          opacity: 0,
        }}
        animate={{ scale: [2, 1, 1, 2], opacity: [0, 1, 1, 0] }}
        transition={{ duration: animDuration }}
      >
        <AppText
          color={textColor}
          fontWeight="700"
          textTransform="uppercase"
          fontSize="50px"
          textAlign="center"
        >
          {text}
        </AppText>
      </MotionBox>
    </MotionBox>
  )
}
