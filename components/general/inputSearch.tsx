import React from 'react'
import { Input, InputGroup, InputLeftElement, Image } from '@chakra-ui/react'
import { InputSize, Color, ComponentSize, FontSize } from '../../theme'

export const AppInputSearch = React.forwardRef((props: any, ref: any) => {
  const { placeholder } = props
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" height="100%">
        <Image src="/assets/init/search.svg" alt="search" width="20px" />
      </InputLeftElement>
      <Input
        ref={ref}
        placeholder={placeholder}
        type="text"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height={InputSize.mediumHeight}
        backgroundColor={Color.blueSecond}
        color={Color.whiteMain}
        borderRadius={ComponentSize.borderRadius}
        fontSize={FontSize.paragraph}
        fontWeight="500"
        border="none"
        _focus={{}}
        _active={{}}
        _placeholder={{ color: Color.whiteSecond }}
        {...props}
      />
    </InputGroup>
  )
})
