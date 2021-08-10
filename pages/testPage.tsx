import { Box } from '@chakra-ui/react'
import { AppButton } from 'components'
import React from 'react'
import { Rdb } from 'utils'

export default function Index() {
  const addUser = (): void => {
    Rdb.ref('users').set({
      firstName: 'Guigume',
      age: 'f1',
      passion: 'ordddinateur',
    })
  }
  //   const onIncrement = (): void => {
  //     Rdb.ref('users').child('12').set({
  //       firstName: 'Guillaume',
  //       age: '21',
  //       passion: 'ordinateur',
  //     })
  //   }

  return (
    <Box>
      <AppButton text={'Add user'} onClick={() => addUser()} />
    </Box>
  )
}
