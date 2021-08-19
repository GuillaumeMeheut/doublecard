import { Box, Img } from '@chakra-ui/react'

export const AppImage = (props) => {
  const { src, alt, profil, ...rest } = props
  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      {...rest}
    >
      <Img
        width="100%"
        height="100%"
        src={
          (profil && src === undefined) || src === null
            ? '/assets/social/defaultProfilImg.svg'
            : src
        }
        alt={alt}
        {...props.image}
      />
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
