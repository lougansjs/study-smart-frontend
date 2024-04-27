import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Image,
  Text,
  useColorModeValue,
  Link as ChakraLink,
  Heading,
  Icon,
  IconButton
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { register } from "@/slices";
import { Logo } from "@/shared"

export function Register() {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleRegister = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (name && email && password) {
      try {
        await dispatch(
          register({
            name,
            email,
            password,
            password_confirmation
          })
        ).unwrap();
      } catch (e) {
        console.error(e);
      }
    } else {
      // Show an error message.
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>  
        <Stack align={'center'}>
          <Box>
            <Image src={Logo} alt='Dan Abramov' />
          </Box>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Heading mb={5} fontSize={'2xl'}>Faça login na sua conta</Heading>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <IconButton
                    variant="link"
                    aria-label='Confirm Password'
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    icon= { <Icon as={ showPassword ? FiEye : FiEyeOff } /> }
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password Confirmation</FormLabel>
              <InputGroup>
                <Input type={showPasswordConfirmation ? 'text' : 'password'} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                <InputRightElement h={'full'}>
                  <IconButton
                    variant="link"
                    aria-label='Confirm Password'
                    onClick={() =>
                      setShowPasswordConfirmation((showPasswordConfirmation) => !showPasswordConfirmation)
                    }
                    icon= { <Icon as={ showPasswordConfirmation? FiEye : FiEyeOff } /> }
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleRegister}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Register
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <ChakraLink as={ReactRouterLink} color={'blue.400'} to='/login'>Login</ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
