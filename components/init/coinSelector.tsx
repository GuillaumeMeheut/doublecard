import React, { FunctionComponent } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { AppImage, AppInputNumber, AppText } from 'components'
import { Color, FontSize, Spaces } from 'theme'
import { TFunction } from 'next-i18next'

type Props = {
  t: TFunction
  coin: number | string
  onChange: (value: number | string) => void
}

export const CoinSelector: FunctionComponent<Props> = ({
  t,
  coin,
  onChange,
}) => {
  return (
    <Box marginBottom={['15px', '25px', '30px', '30px']}>
      <AppText
        fontSize={FontSize.subtitle}
        fontWeight="700"
        marginBottom={Spaces.component}
      >
        {t('init:entry_cost')}
      </AppText>
      <Box display="flex" marginLeft={Spaces.component}>
        <AppInputNumber
          value={coin}
          step={1}
          defaultValue={coin}
          min={0}
          inputprops={{ textAlign: 'center' }}
          onChange={(value) => onChange(Math.round(Number(value)))}
        />
        <AppImage
          marginLeft={Spaces.componentSmall}
          src="/assets/common/coin.svg"
          alt="coin"
          width={['20px', '25px', '30px', '30px']}
        />
      </Box>
    </Box>
  )
}
