import React from 'react'
import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { AppImage } from 'components'

export const AppImageLink = React.forwardRef((props: any, ref: any) => {
  return (
    <Box {...props.boxprops}>
      <NextLink href={props.href} passHref>
        <Link ref={ref} _focus={{}} _active={{}}>
          <AppImage src={props.src} {...props} />
        </Link>
      </NextLink>
    </Box>
  )
})
