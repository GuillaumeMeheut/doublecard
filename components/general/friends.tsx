import React, { FunctionComponent, useState } from 'react'
import { Box, keyframes } from '@chakra-ui/react'
import { Color, ComponentSize } from 'theme'
import { AppImage, BodyFriends, HeaderFriends, MotionBox } from 'components'

export const Friends: FunctionComponent = () => {
  const user = { username: 'Guillaume', status: 'available' }
  const friends = [
    {
      _id: '7899456',
      username: 'Colin',
      status: 'away',
      profilPic: 'https://picsum.photos/300/300',
      lastMsg: 'Heyy comment tu vas ?',
    },
    {
      _id: '12317576',
      username: 'Nathan',
      status: 'absent',
      profilPic: 'https://picsum.photos/800/300',
      lastMsg:
        'Salut monn super bro est-ce que ça te dirais de venir jouer avec moi ?',
    },
    {
      _id: '785646',
      username: 'fdsfs',
      status: 'away',
      profilPic: 'https://picsum.photos/400/300',
      lastMsg: 'Heyy comment tu vas ?',
    },
    {
      _id: '12647576',
      username: 'xcwc',
      status: 'available',
      profilPic: 'https://picsum.photos/500/300',
      lastMsg:
        'Salut monn super bro est-ce que ça te dirais de venir jouer avec moi ?',
    },
    {
      _id: '796456',
      username: 'Colin',
      status: 'away',
      profilPic: 'https://picsum.photos/200/300',
      lastMsg: 'Heyy comment tu vas ?',
    },
    {
      _id: '12316476',
      username: 'Nathan',
      status: 'absent',
      profilPic: 'https://picsum.photos/600/300',
      lastMsg:
        'Salut monn super bro est-ce que ça te dirais de venir jouer avec moi ?',
    },
  ]

  const [isOpen, setIsOpen] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notification, setNotification] = useState<boolean>(true)
  const zoom = keyframes`
  0% { transform: scale(70%); }
  50% { transform: scale(100%); }
  100% { transform: scale(70%); }
`
  return (
    <>
      <MotionBox
        position="fixed"
        bottom="0"
        left="0"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={['120px', '120px', '120px', '120px']}
        height={['50px', '50px', '50px', '50px']}
        borderTopRightRadius={ComponentSize.borderRadius}
        backgroundColor={Color.blueMain}
        cursor={isOpen ? null : 'pointer'}
        onClick={() => (isOpen ? null : setIsOpen(true))}
        animate={{
          width: isOpen ? '250px' : '120px',
          height: isOpen ? '500px' : '50px',
        }}
        initial={false}
      >
        {isOpen ? (
          <>
            <HeaderFriends
              username={user.username}
              status={user.status}
              setIsOpen={setIsOpen}
            />
            <BodyFriends friends={friends} />
          </>
        ) : (
          <Box
            // {notification ? _before={{
            //   content: `""`,
            //   position: 'absolute',
            //   right: '22px',
            //   top: '10px',
            //   backgroundColor: Color.red,
            //   borderRadius: '50%',
            //   width: '10px',
            //   height: '10px',
            //   animation: `${zoom} infinite 2s linear`,
            // }}: null}
            _before={{
              content: `""`,
              position: 'absolute',
              right: '22px',
              top: '10px',
              backgroundColor: Color.red,
              borderRadius: '50%',
              width: '10px',
              height: '10px',
              animation: notification ? `${zoom} infinite 2s linear` : null,
            }}
          >
            <AppImage
              src={'/assets/social/friends.svg'}
              width={['35px', '35px', '35px', '35px']}
              height={['24.5px', '24.5px', '24.5px', '24.5px']}
              alt="friends"
            />
          </Box>
        )}
      </MotionBox>
    </>
  )
}
