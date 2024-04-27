import { useColorModeValue, Flex } from '@chakra-ui/react'

export function Profile() {
  return (
    <>
      <Flex
        height="96"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
      >
      </Flex>
    </>
  )
}