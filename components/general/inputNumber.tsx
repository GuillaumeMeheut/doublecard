import React from 'react'
import { NumberInput, NumberInputField } from '@chakra-ui/react'
import { InputSize, Color, ComponentSize, FontSize, Spaces } from '../../theme'

export const AppInputNumber = React.forwardRef((props: any, ref: any) => {
  const { placeholder, step, defaultValue, min, max, inputprops } = props
  return (
    <NumberInput
      ref={ref}
      step={step}
      defaultValue={defaultValue}
      min={min}
      max={max}
      placeholder={placeholder}
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <NumberInputField
        width={InputSize.smallWidth}
        height={InputSize.smallHeight}
        backgroundColor={Color.blueSecond}
        color={Color.whiteMain}
        borderRadius={ComponentSize.borderRadius}
        fontSize={FontSize.subtitle}
        _placeholder={{ color: Color.whiteSecond }}
        paddingX={Spaces.component}
        border="none"
        fontWeight="500"
        _focus={{}}
        _active={{}}
        {...inputprops}
      />
    </NumberInput>
  )
})
