import React, { FunctionComponent } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { UnlockIcon, LockIcon } from '@chakra-ui/icons'
import { AppInputPassword, AppText } from 'components'
import { Color, FontSize, InputSize, Spaces } from 'theme'
import { TFunction } from 'next-i18next'

type Props = {
  t: TFunction
  isPublic: boolean
  onClick: (value: boolean) => void
  boxProps?: BoxProps
  pin: string
  onChange: (value: string) => void
}

export const PrivacySelector: FunctionComponent<Props> = ({
  t,
  isPublic,
  onClick,
  boxProps,
  pin,
  onChange,
}) => {
  return (
    <Box {...boxProps}>
      <Box
        display="flex"
        cursor="pointer"
        color={isPublic ? Color.whiteMain : Color.whiteSecond}
        onClick={() => onClick(true)}
      >
        <UnlockIcon
          width={['16px', '16px', '20px', '20px']}
          height={['20px', '20px', '25px', '25px']}
          marginRight={Spaces.componentSmall}
        />
        <AppText
          color={isPublic ? Color.whiteMain : Color.whiteSecond}
          fontSize={FontSize.subtitle}
          fontWeight="700"
        >
          {t('init:public')}
        </AppText>
      </Box>
      <Box
        display="flex"
        cursor="pointer"
        color={!isPublic ? Color.whiteMain : Color.whiteSecond}
        marginY={Spaces.componentSmall}
        onClick={() => onClick(false)}
      >
        <LockIcon
          width={['16px', '16px', '20px', '20px']}
          height={['20px', '20px', '25px', '25px']}
          marginRight={Spaces.componentSmall}
        />
        <AppText
          color={!isPublic ? Color.whiteMain : Color.whiteSecond}
          fontSize={FontSize.subtitle}
          fontWeight="700"
        >
          {t('init:private')}
        </AppText>
      </Box>
      <AppInputPassword
        placeholder="****"
        isDisabled={isPublic ? true : false}
        maxLength="4"
        value={pin}
        width={InputSize.pinWidth}
        height={InputSize.pinHeight}
        paddingX={Spaces.componentSmall}
        textAlign="center"
        onChange={(ev) => onChange(ev.target.value)}
        iconprops={{
          marginLeft: ['15px', '25px', '0', '0'],
          marginRight: '0',
        }}
      />
    </Box>
  )
}
