import React, { FunctionComponent, useState } from 'react'
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { SelectGame, DunoModal } from 'components'
import { Color } from 'theme'
import { TFunction } from 'next-i18next'

type Props = {
  isOpen: boolean
  onClose: () => void
  t: TFunction
}

export const ModalInit: FunctionComponent<Props> = ({ isOpen, onClose, t }) => {
  const [game, setGame] = useState<string>('select')
  const [step, setStep] = useState<string>(game)

  // assigner un composant a un jeu
  const componentGame = {
    select: (
      <SelectGame
        t={t}
        setGame={setGame}
        selectedGame={game}
        onClose={onClose}
        onNext={(step) => setStep(step)}
      />
    ),
    DUNO: (
      <DunoModal
        t={t}
        onPrevious={(step) => setStep(step)}
        onCreate={(setting) => {
          console.log(setting)
          onClose()
        }}
      />
    ),
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />

      <ModalContent
        minWidth={['300px', '500px', '625px', '625px']}
        backgroundColor={Color.blueMain}
      >
        {componentGame[step]}
      </ModalContent>
    </Modal>
  )
}
