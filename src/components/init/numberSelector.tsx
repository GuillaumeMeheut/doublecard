import React, { FunctionComponent } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { FontSize, Spaces, Color } from '../../theme'
import { AppText } from '../general'

type Props = {
  text: string
  start: number
  end: number
  selectedNumber: number
  onClick: (value: number) => void
  boxProps?: BoxProps
}

export const NumberSelector: FunctionComponent<Props> = ({
  text,
  start,
  end,
  selectedNumber,
  onClick,
  boxProps,
}) => {
  return (
    <Box {...boxProps}>
      <AppText
        fontSize={FontSize.subtitle}
        fontWeight="700"
        marginBottom={Spaces.component}
      >
        {text}
      </AppText>
      <Box display="flex" marginLeft={Spaces.component}>
        {Array(end - start + 1)
          .fill(0)
          .map((el, i) => (
            <AppText
              key={i}
              color={
                selectedNumber === i + start
                  ? Color.whiteMain
                  : Color.whiteSecond
              }
              fontSize={FontSize.subtitle}
              fontWeight="700"
              marginRight={Spaces.component}
              cursor="pointer"
              onClick={() => onClick(i + start)}
            >
              {i + start}
            </AppText>
          ))}
      </Box>
    </Box>
  )
}
