import React from 'react'
import { Button } from '@chakra-ui/react'
import {
  ButtonSize,
  Color,
  ColorHover,
  ComponentSize,
  FontSize,
} from '../../theme'

export const AppButton = React.forwardRef((props: any, ref: any) => {
  return (
    <Button
      ref={ref}
      display="flex"
      alignItems="center"
      justifyContent="center"
      minWidth={ButtonSize.mediumWidth}
      height={ButtonSize.mediumHeight}
      backgroundColor={Color.red}
      color={Color.whiteMain}
      borderRadius={ComponentSize.borderRadius}
      fontSize={FontSize.button}
      fontWeight="700"
      _focus={{}}
      _active={{}}
      _hover={{
        backgroundColor: ColorHover.red,
      }}
      {...props}
    >
      {props.text}
    </Button>
  )
})
