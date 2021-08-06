import { Box } from '@chakra-ui/react'
import {
  AppButton,
  AppButtonLink,
  AppHead,
  AppImage,
  AppInput,
  AppInputPassword,
  AppText,
} from 'components'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { ButtonSize, Color, ColorHover, FontSize, Spaces } from 'theme'
import { getLanguageHeaders } from 'utils'

export default function Index() {
  const t1 = useTranslation('common')
  const t2 = useTranslation('auth')

  return (
    <>
      <AppHead
        icon="/assets/common/logo.svg"
        url={`${process.env.NEXT_PUBLIC_BASE_URL}`}
        name={t2.t('auth:page_title')}
        description={t2.t('auth:page_description')}
        themeColor={Color.blueMain}
        author={t1.t('common:head_author')}
        keywords={t2.t('auth:page_keywords')}
        language={t1.t('common:language')}
      />
      <Box
        minHeight={'100vh'}
        backgroundColor={Color.blackMain}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginBottom={['0px', '100px', '150px', '150px']}
        >
          <AppImage
            src="/assets/common/logo.svg"
            alt="logo double card"
            width={['180px', '200px', '250px', '250px']}
            height={['120px', '150px', '184px', '184px']}
            marginBottom={['30px', '40px', '50px', '50px']}
          />

          <AppInput
            placeholder={t2.t('auth:mail')}
            type="text"
            marginBottom={Spaces.component}
          />
          <AppInputPassword
            placeholder={t2.t('auth:password')}
            boxprops={{
              marginBottom: ['20px', '25px', '30px', '30px'],
            }}
          />

          <AppButton
            fontSize={FontSize.title}
            width={ButtonSize.largeWidth}
            height={ButtonSize.largeHeight}
            backgroundColor={Color.blueMain}
            _hover={{
              backgroundColor: ColorHover.blueMain,
            }}
            marginBottom={Spaces.component}
            text={t2.t('auth:signin')}
          />
          <AppButtonLink href="/auth/signup" marginBottom={Spaces.component}>
            {t2.t('auth:signup')}
          </AppButtonLink>
          <AppText>{t2.t('auth:play_as_guest')}</AppText>
        </Box>
      </Box>
    </>
  )
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(getLanguageHeaders(context), [
        'common',
        'auth',
      ])),
    },
  }
}
