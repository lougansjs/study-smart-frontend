import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Image,
  Text,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { login } from "@/slices/authSlice";
import { Logo } from '@/shared';

export function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
      try {
        await dispatch(
          login({
            email,
            password,
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
        <Box>
          <Image src={Logo} alt='Dan Abramov' />
        </Box>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Heading mb={5} fontSize={'2xl'}>Faça login na sua conta</Heading>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Endereço de e-mail</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Lembrar-me</Checkbox>
                <Link as={RouterLink} to="#" color={'blue.400'}>Esqueceu a senha?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleLogin}
              >
                Entrar
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Não tem uma conta? <Link as={RouterLink} to="/register" color={'blue.400'}>Registre-se</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
