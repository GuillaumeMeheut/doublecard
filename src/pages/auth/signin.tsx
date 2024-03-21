import { Box, useToast } from '@chakra-ui/react'
import { Form, Formik } from 'formik'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import {
  AppHead,
  AppImage,
  AppField,
  AppInput,
  AppInputPassword,
  AppButton,
  AppButtonLink,
} from '../../components'
import { Color, FontSize, ButtonSize, ColorHover, Spaces } from '../../theme'
import { useAuth, getLanguageHeaders } from '../../utils'

export default function Index() {
  const t1 = useTranslation('common')
  const t2 = useTranslation('auth')

  const { signin } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const signIn = ({ email, password }, actions) => {
    signin(email, password)
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        actions.setSubmitting(false)
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      })
  }

  const validateEmail = (value) => {
    let error
    if (!value) error = t1.t('auth:required')
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
      error = t1.t('auth:email_invalid')
    return error
  }

  const validatePassword = (value) => {
    let error = ''
    if (!value) error = t1.t('auth:required')

    return error
  }

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

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values, actions) => {
              signIn(values, actions)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box
                  display="flex"
                  flexDirection={'column'}
                  justifyContent="center"
                  alignItems="center"
                  marginBottom={['20px', '30px', '40px', '40px']}
                >
                  <AppField name="email" validate={validateEmail}>
                    <AppInput
                      id="email"
                      placeholder={t2.t('auth:mail')}
                      autoComplete="email"
                      type="text"
                    />
                  </AppField>

                  <AppField name="password" validate={validatePassword}>
                    <AppInputPassword
                      id="password"
                      placeholder={t2.t('auth:password')}
                      autoComplete="new-password"
                    />
                  </AppField>
                </Box>
                <AppButton
                  type="submit"
                  isLoading={isSubmitting}
                  justifySelf="center"
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
                <AppButtonLink
                  href="/auth/signup"
                  marginBottom={Spaces.component}
                >
                  {t2.t('auth:signup')}
                </AppButtonLink>
              </Form>
            )}
          </Formik>
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
