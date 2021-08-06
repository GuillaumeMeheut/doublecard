import React, { FunctionComponent } from 'react'
import { Box, Image } from '@chakra-ui/react'
import { Color, ComponentSize, Spaces } from '../../theme'
import { AppImage, AppText, Dot } from 'components'

type Props = {
  username: string
  status: string
  setIsOpen: (v: boolean) => void
}

export const HeaderFriends: FunctionComponent<Props> = ({
  username,
  status,
  setIsOpen,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="40px"
      borderTopRightRadius={ComponentSize.borderRadius}
      paddingX={Spaces.componentBig}
      backgroundColor={Color.blueSecond}
    >
      <AppImage
        src="/assets/social/add_friend.svg"
        width={['20px', '20px', '20px', '20px']}
        height={['18px', '18px', '18px', '18px']}
        alt="add a friend"
        cursor="pointer"
      />
      <Box display="flex" alignItems="center">
        <AppText
          marginRight="10px"
          fontWeight="500"
          width="100px"
          textAlign="right"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {username}
        </AppText>
        <Dot status={status} />
      </Box>
      <Image
        src="/assets/social/reduce.svg"
        cursor="pointer"
        paddingY="5px"
        onClick={() => setIsOpen(false)}
      />
    </Box>
  )
}
