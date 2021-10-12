import React, { FunctionComponent, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { ButtonSize, Color, ColorHover, FontSize, Spaces } from 'theme'
import { AppButtonLink, AppImage, AppImageLink, AppText } from 'components'
import { TFunction } from 'next-i18next'
import { User } from 'types'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { firestore, useAuth } from 'utils'

type Props = {
  t: TFunction
  user: any
}

export const NavBar: FunctionComponent<Props> = ({ t, user }) => {
  const [userData, loading] = useDocumentDataOnce<User>(
    firestore.doc(`/users/${user.id}`),
  )

  // const [userData, loading] = user
  //   ? useDocumentDataOnce<User>(firestore.doc(`/users/${user.id}`))
  //   : null

  // const getCoin = () => {}

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="100px"
    >
      <AppImageLink
        href="/"
        src="/assets/common/logo.svg"
        width={['75px', '90px', '112px', '112px']}
        height={['56px', '66px', '82px', '82px']}
        boxprops={{
          marginLeft: ['15px', '15px', '30px', '30px'],
        }}
      />
      <Box display="flex">
        <AppButtonLink
          href="/"
          width={ButtonSize.mediumWidth}
          height={ButtonSize.mediumHeight}
          fontSize={FontSize.subtitle}
          color={Color.whiteMain}
          backgroundColor={Color.blueMain}
          _hover={{ backgroundColor: ColorHover.blueMain }}
        >
          {t('common:play')}
        </AppButtonLink>
        <AppButtonLink
          href="/rules"
          width={ButtonSize.mediumWidth}
          height={ButtonSize.mediumHeight}
          marginX={Spaces.component}
          fontSize={FontSize.subtitle}
          color={Color.whiteMain}
          backgroundColor={Color.blueMain}
          _hover={{ backgroundColor: ColorHover.blueMain }}
        >
          {t('common:rules')}
        </AppButtonLink>
        <AppButtonLink
          href="/shop"
          width={ButtonSize.mediumWidth}
          height={ButtonSize.mediumHeight}
          fontSize={FontSize.subtitle}
          color={Color.whiteMain}
          backgroundColor={Color.blueMain}
          _hover={{ backgroundColor: ColorHover.blueMain }}
        >
          {t('common:shop')}
        </AppButtonLink>
      </Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center">
          <AppText
            fontSize={FontSize.title}
            fontWeight="700"
            marginRight={Spaces.componentSmall}
          >
            {loading ? '?' : userData.coin}
          </AppText>
          <AppImage
            src="/assets/common/coin.svg"
            width={['20px', '30px', '30px', '30px']}
            height={['20px', '30px', '30px', '30px']}
          />
        </Box>
        <AppImageLink
          href="/profil"
          src={loading ? null : userData.img}
          profil={true}
          width={['30px', '40px', '50px', '50px']}
          height={['30px', '40px', '50px', '50px']}
          rounded="full"
          boxprops={{
            marginX: '30px',
          }}
        />
      </Box>
    </Box>
  )
}
