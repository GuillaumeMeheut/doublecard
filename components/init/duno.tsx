import React, { FunctionComponent, useState } from 'react'
import { ModalBody, ModalFooter, useToast } from '@chakra-ui/react'
import {
  AppInput,
  AppButton,
  NumberSelector,
  PrivacySelector,
  CoinSelector,
} from 'components'
import { TFunction } from 'next-i18next'
import { DunoSetting } from 'types'
import { InputSize } from 'theme'
import { createLobby } from 'api'
import { useRouter } from 'next/router'
import { useAuth } from 'utils'

type Props = {
  t: TFunction
  onPrevious: (step: string) => void
}

export const DunoModal: FunctionComponent<Props> = ({ t, onPrevious }) => {
  const [setting, setSetting] = useState<DunoSetting>({
    type: 'DUNO',
    room_name: '',
    nb_player: 2,
    round: 2,
    coin: 0,
    public: true,
    pin: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const create = (setting) => {
    setIsSubmitting(true)
    createLobby(setting, user)
      .then((res) => {
        router.push(`/lobby/${setting.type.toLowerCase()}/${res.data}`)
        setIsSubmitting(false)
      })
      .catch((error) => {
        setIsSubmitting(false)
        console.log(error.message)
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      })
  }

  return (
    <>
      <ModalBody
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        padding={['30px 40px']}
      >
        <AppInput
          placeholder={t('init:room_name')}
          width={InputSize.mediumWidth}
          height={InputSize.mediumHeight}
          marginBottom={['20px', '30px', '40px', '40px']}
          onChange={(ev) =>
            setSetting({ ...setting, room_name: ev.target.value })
          }
        />
        <NumberSelector
          text={t('init:nb_player')}
          start={2}
          end={4}
          selectedNumber={setting.nb_player}
          onClick={(value) => setSetting({ ...setting, nb_player: value })}
          boxProps={{ marginBottom: ['15px', '25px', '30px', '30px'] }}
        />
        <NumberSelector
          text={t('init:nb_round')}
          start={1}
          end={5}
          selectedNumber={setting.round}
          onClick={(value) => setSetting({ ...setting, round: value })}
          boxProps={{ marginBottom: ['15px', '25px', '30px', '30px'] }}
        />
        <CoinSelector
          t={t}
          coin={setting.coin}
          onChange={(value) => setSetting({ ...setting, coin: value })}
        />
        <PrivacySelector
          t={t}
          isPublic={setting.public}
          onClick={(value) => setSetting({ ...setting, public: value })}
          pin={setting.pin}
          onChange={(value) => setSetting({ ...setting, pin: value })}
        />
      </ModalBody>
      <ModalFooter>
        <AppButton
          text={t('init:previous')}
          backgroundColor="transparent"
          _hover={{
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          }}
          fontWeight="400"
          onClick={() => onPrevious('select')}
        />
        <AppButton
          text={t('init:create')}
          isLoading={isSubmitting}
          onClick={() => create(setting)}
        />
      </ModalFooter>
    </>
  )
}
