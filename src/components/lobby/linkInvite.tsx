import React, { FunctionComponent } from 'react'
import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { AppText } from '../general'

type Props = {
  link: string
}

export const LinkInviteLobby: FunctionComponent<Props> = ({ link }) => {
  const t1 = useTranslation('lobby')

  return (
    <Flex>
      <AppText>{t1.t('lobby:invit')}</AppText>
    </Flex>
  )
}
