import { ComponentProps } from 'react'
import { Box } from '@chakra-ui/react'

import { motion } from 'framer-motion'

export const MotionBox = motion<ComponentProps<typeof Box>>(Box)
