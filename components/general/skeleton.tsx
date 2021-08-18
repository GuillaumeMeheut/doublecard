import { Skeleton, SkeletonProps } from '@chakra-ui/react'
import { Color } from '../../theme'

export const AppSkeleton = ({ children, ...props }: SkeletonProps) => {
  return (
    <Skeleton colorScheme={Color.blackMain} {...props}>
      {children}
    </Skeleton>
  )
}
