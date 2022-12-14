import { Box, Flex, Spinner } from '@chakra-ui/react'

import { SimpleLayout } from '~/components/Layouts/SimpleLayout'

export const LoadingAnimation = () => (
  <Flex h="100%" justifyContent="center" alignItems="center">
    <Spinner size="xl" />
  </Flex>
)

export const LoadingScreen = (): React.ReactElement => (
  <SimpleLayout>
    <Box h="100vh">
      <LoadingAnimation />
    </Box>
  </SimpleLayout>
)
