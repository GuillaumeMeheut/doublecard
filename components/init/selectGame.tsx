import React, { FunctionComponent } from 'react'
import {
  Box,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from '@chakra-ui/react'
import { AppImage, AppInputSearch, AppButton, AppImageLink } from 'components'
import { Color, ComponentSize, ImageSize, Spaces } from 'theme'
import { Games } from 'utils'
import { TFunction } from 'next-i18next'

type Props = {
  t: TFunction
  setGame: (game: string) => void
  selectedGame: string
  onClose: () => void
  onNext: (game: string) => void
}

export const SelectGame: FunctionComponent<Props> = ({
  t,
  setGame,
  selectedGame,
  onClose,
  onNext,
}) => {
  return (
    <>
      <ModalHeader>
        <AppInputSearch placeholder={t('init:search_game')} />
      </ModalHeader>
      <ModalBody
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        justifyContent="center"
        alignItems="center"
        maxHeight="350px"
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
        {Games.map((game) => {
          return (
            <Box
              key={game.id}
              display="flex"
              justifySelf="center"
              marginBottom={Spaces.component}
              paddingX={Spaces.component}
              borderBottom={`3px solid ${
                selectedGame === game.id ? Color.whiteMain : 'transparent'
              }`}
            >
              <AppImage
                src={game.img}
                width={ImageSize.gameIcon}
                height={ImageSize.gameIcon}
                cursor="pointer"
                image={{ objectFit: 'fill' }}
                onClick={() => setGame(game.id)}
              />
              <Tooltip
                hasArrow
                placement="bottom"
                label={t('init:check_rule')}
                aria-label="A tooltip"
              >
                <AppImageLink
                  src="/assets/init/help.svg"
                  href={game.rule}
                  width="24px"
                  height="24px"
                  cursor="pointer"
                />
              </Tooltip>
            </Box>
          )
        })}
      </ModalBody>
      <ModalFooter>
        <AppButton
          text={t('init:cancel')}
          backgroundColor="transparent"
          _hover={{
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          }}
          fontWeight="400"
          onClick={onClose}
        />
        <AppButton text={t('init:next')} onClick={() => onNext(selectedGame)} />
      </ModalFooter>
    </>
  )
}
