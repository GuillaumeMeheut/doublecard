import React from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { InputSize, Color, ComponentSize, FontSize, Spaces } from '../../theme'

export const AppInputPassword = React.forwardRef((props: any, ref: any) => {
  const { placeholder } = props
  const [show, setShow] = React.useState<boolean>(false)
  return (
    <InputGroup {...props.boxprops}>
      <Input
        ref={ref}
        placeholder={placeholder}
        type={show ? 'text' : 'password'}
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
      <InputRightElement height="100%">
        {show ? (
          <ViewIcon
            color={Color.whiteMain}
            width={['15px', '15px', '18px', '20px']}
            height={['15px', '15px', '18px', '20px']}
            cursor="pointer"
            marginRight={Spaces.componentSmall}
            onClick={() => setShow(!show)}
            {...props.iconProps}
          />
        ) : (
          <ViewOffIcon
            color={Color.whiteMain}
            width={['15px', '15px', '18px', '20px']}
            height={['15px', '15px', '18px', '20px']}
            cursor="pointer"
            marginRight={Spaces.componentSmall}
            onClick={() => setShow(!show)}
            {...props.iconprops}
          />
        )}
      </InputRightElement>
    </InputGroup>
  )
})
