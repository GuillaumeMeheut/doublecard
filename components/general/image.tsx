import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'

export const AppImage = (props) => {
  const { src, alt, ...rest } = props
  return (
    <Box position="relative" overflow="hidden" {...rest}>
      <NextImage
        objectFit="cover"
        layout="fill"
        src={src}
        alt={alt}
        {...props.image}
      />
    </Box>
  )
}
