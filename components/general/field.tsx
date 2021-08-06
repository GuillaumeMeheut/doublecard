import React, { cloneElement } from 'react'
import { Box, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { Field } from 'formik'
import { FontSize } from 'theme'

export const AppField = React.forwardRef((props: any, ref: any) => {
  const { children, validate, name } = props
  return (
    <Box {...props} marginBottom="15px">
      <Field ref={ref} name={name} validate={validate}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            {cloneElement(children, { ...field })}
            <FormErrorMessage fontSize={FontSize.paragraph}>
              {form.errors[name]}
            </FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Box>
  )
})
