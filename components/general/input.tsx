import React from 'react'
import { Input } from '@chakra-ui/react'
import { InputSize, Color, ComponentSize, FontSize } from '../../theme'

export const AppInput = React.forwardRef((props: any, ref: any) => {
  const { placeholder, type } = props
  return (
    <Input
      ref={ref}
      placeholder={placeholder}
      type={type}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={InputSize.mediumWidth}
      height={InputSize.largeHeight}
      backgroundColor={Color.blueSecond}
      color={Color.whiteMain}
      borderRadius={ComponentSize.borderRadius}
      fontSize={FontSize.subtitle}
      fontWeight="500"
      border="none"
      _focus={{}}
      _active={{}}
      _placeholder={{ color: Color.whiteSecond }}
      {...props}
    />
  )
})
