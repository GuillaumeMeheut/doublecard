import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import {
  Color,
  ColorHover,
  ComponentSize,
  FontSize,
  ProfilPicture,
  Spaces,
} from '../../theme'
import { AppImage, AppText } from '../general'
import { Dot } from './dot'

type Props = {
  friends: any
}

export const BodyFriends: FunctionComponent<Props> = ({ friends }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
      height="100%"
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: Color.blueSecond,
          borderRadius: ComponentSize.borderRadius,
        },
      }}
    >
      {friends.map((friend) => {
        return (
          <Box
            key={friend.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            padding={Spaces.componentSmall}
            cursor="pointer"
            _hover={{
              backgroundColor: ColorHover.blueMain,
            }}
          >
            <AppImage
              src={friend.profilPic}
              width={ProfilPicture.small}
              height={ProfilPicture.small}
              rounded="full"
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
              marginX={Spaces.componentSmall}
            >
              <AppText fontWeight="500">{friend.username}</AppText>
              <AppText
                fontSize={FontSize.note}
                color={Color.whiteSecond}
                width="145px"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {friend.lastMsg}
              </AppText>
            </Box>
            <Dot status={friend.status} />
          </Box>
        )
      })}
    </Box>
  )
}
