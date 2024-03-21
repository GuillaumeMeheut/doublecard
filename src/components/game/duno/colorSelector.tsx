import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { MotionBox } from '../../general'

type Props = {
  selectColor: (color: string) => void
}

export const ColorSelector: FunctionComponent<Props> = ({ selectColor }) => {
  const colors = [
    { color: '#375B92', value: 'blue' },
    { color: '#FF4848', value: 'red' },
    { color: '#EBEF2E', value: 'yellow' },
    { color: '#18FF59', value: 'green' },
  ]
  return (
    <Box position="absolute" min-width="100vw" min-height="100vh" zIndex="10">
      <Box backgroundColor="#000000" width="100%" height="100%" opacity="1" />
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows="1fr 1fr"
        gridGap={['20px', '40px', '40px', '40px']}
      >
        {colors.map((color, index) => {
          return (
            <MotionBox
              key={index}
              width={['320px', '320px', '320px', '320px']}
              height={['320px', '320px', '320px', '320px']}
              backgroundColor={color.color}
              borderRadius={['15px', '15px', '20px', '20px']}
              cursor="pointer"
              onClick={() => selectColor(color.value)}
              animate={{
                width: '320px',
                height: '320px',
              }}
              initial={{
                width: '0px',
                height: '0px',
              }}
              transition={{
                delay: 0.2 * index,
                type: 'tween',
              }}
            />
          )
        })}
      </Box>
    </Box>
  )
}
