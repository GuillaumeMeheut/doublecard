import React from 'react'
import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  ButtonSize,
  Color,
  ColorHover,
  ComponentSize,
  FontSize,
} from '../../theme'

export const AppButtonLink = React.forwardRef((props: any, ref: any) => {
  return (
    <NextLink href={props.href} passHref>
      <Link
        ref={ref}
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={Color.red}
        color={Color.whiteMain}
        borderRadius={ComponentSize.borderRadius}
        fontSize={FontSize.title}
        width={ButtonSize.largeWidth}
        height={ButtonSize.largeHeight}
        fontWeight="700"
        _focus={{}}
        _active={{}}
        _hover={{
          backgroundColor: ColorHover.red,
        }}
        {...props}
      >
        {props.children}
      </Link>
    </NextLink>
  )
})
