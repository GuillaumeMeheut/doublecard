import { Box, Image } from '@chakra-ui/react'

export const AppImage = (props) => {
  const { src, alt, ...rest } = props
  return (
    <Box position="relative" overflow="hidden" {...rest}>
      <Image
        objectFit="cover"
        layout="fill"
        src={src}
        alt={alt}
        {...props.image}
      />
    </Box>
  )
}
