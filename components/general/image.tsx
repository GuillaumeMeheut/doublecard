import { Box, Img } from '@chakra-ui/react'

export const AppImage = (props) => {
  const { src, alt, ...rest } = props
  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      {...rest}
    >
      <Img width="100%" height="100%" src={src} alt={alt} {...props.image} />
    </Box>
  )
}

//with nextImage
// <Box
//   position="relative"
//   overflow="hidden"
//   {...rest}
// >
//   <Image objectFit="cover" layout="fill" src={src} alt={alt} {...props.image} />
// </Box>
