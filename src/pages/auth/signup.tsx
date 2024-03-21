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
import { Color, FontSize, ButtonSize, Spaces, ColorHover } from '../../theme'
import { useAuth, getLanguageHeaders } from '../../utils'

export default function Index() {
  const t1 = useTranslation('common')
  const t2 = useTranslation('auth')

  const { signup } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const signUp = ({ email, password, pseudo }) => {
    signup(email, password, pseudo)
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      })
  }

  const validatePseudo = (value) => {
    let error
    if (!value) error = t1.t('auth:required')
    else if (value.length > 12) error = t1.t('auth:pseudo_length_max')
    else if (value.length < 3) error = t1.t('auth:pseudo_length_min')
    else if (/[^a-zA-Z0-9]/.test(value))
      error = t1.t('auth:pseudo_special_chara')

    return error
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
    else if (value.length < 8) error = t1.t('auth:password_length_max')
    else if (!/(?=.*[0-9])/.test(value)) error = t1.t('auth:password_number')

    return error
  }
  const validateConfirmPassword = (pass, value) => {
    let error = ''
    if (!value) error = t1.t('auth:required')
    else if (pass && value && pass !== value)
      error = t1.t('auth:password_no_match')

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
              pseudo: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values, actions) => {
              signUp(values)
              actions.setSubmitting(false)
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Box
                  display="flex"
                  flexDirection={'column'}
                  justifyContent="center"
                  alignItems="center"
                  marginBottom={['20px', '30px', '40px', '40px']}
                >
                  <Box
                    display="flex"
                    flexDirection={['column', 'column', 'row', 'row']}
                    alignItems="space-between"
                    height="100%"
                  >
                    <AppField name="pseudo" validate={validatePseudo}>
                      <AppInput
                        id="pseudo"
                        placeholder={t2.t('auth:pseudo')}
                        autoComplete="pseudo"
                        type="text"
                      />
                    </AppField>
                    <AppField
                      name="email"
                      validate={validateEmail}
                      marginLeft={['0', '0', '15px', '15px']}
                    >
                      <AppInput
                        id="email"
                        placeholder={t2.t('auth:mail')}
                        autoComplete="email"
                        type="text"
                      />
                    </AppField>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection={['column', 'column', 'row', 'row']}
                    alignItems="space-between"
                    height="100%"
                  >
                    <AppField name="password" validate={validatePassword}>
                      <AppInputPassword
                        id="password"
                        placeholder={t2.t('auth:password')}
                        autoComplete="new-password"
                      />
                    </AppField>

                    <AppField
                      name="confirmPassword"
                      validate={(value) =>
                        validateConfirmPassword(values.password, value)
                      }
                      marginLeft={['0', '0', '15px', '15px']}
                    >
                      <AppInputPassword
                        id="confirmPassword"
                        placeholder={t2.t('auth:confirm_password')}
                        autoComplete="new-password"
                      />
                    </AppField>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                >
                  <AppButton
                    type="submit"
                    isLoading={isSubmitting}
                    justifySelf="center"
                    fontSize={FontSize.title}
                    width={ButtonSize.largeWidth}
                    height={ButtonSize.largeHeight}
                    marginBottom={Spaces.component}
                    text={t2.t('auth:signup')}
                  />
                  <AppButtonLink
                    href="/auth/signin"
                    marginBottom={Spaces.component}
                    backgroundColor={Color.blueMain}
                    _hover={{
                      backgroundColor: ColorHover.blueMain,
                    }}
                  >
                    {t2.t('auth:signin2')}
                  </AppButtonLink>
                </Box>
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
