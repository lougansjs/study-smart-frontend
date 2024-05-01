import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUser, logout, UserProfileData } from "@/stores";
import { Link as RouterLink, To, Outlet, useNavigate } from "react-router-dom";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Center,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiMoon,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSun,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

import { Logo } from "@/shared"

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, url: '/' },
  { name: 'Trending', icon: FiTrendingUp, url: '/trending' },
  { name: 'Explore', icon: FiCompass, url: '/explore'},
  { name: 'Favourites', icon: FiStar, url: '/favorites' },
  { name: 'Settings', icon: FiSettings, url: '/settings' },
];


export function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.id));
    }
  }, [basicUserInfo, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('dark.100', 'dark.800')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      { userProfileInfo && (<MobileNav onOpen={onOpen} handleLogout={handleLogout} userProfileInfo={userProfileInfo} />)}
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
 
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'dark.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('dark.200', 'dark.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Button variant="link" onClick={() => navigate("/")}>
          <Image src={Logo} alt='Study Smart' />
        </Button>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} to={link.url} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  to: To
  children: ReactText;
}
const NavItem = ({ icon, to, children, ...rest }: NavItemProps) => {
  return (
    <RouterLink to={to} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </RouterLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  handleLogout: () => void;
  userProfileInfo: UserProfileData;
}
const MobileNav = ({ onOpen, handleLogout, userProfileInfo, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'dark.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('dark.200', 'dark.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <IconButton
        onClick={toggleColorMode}
        variant="link"
        aria-label='Search database'
        colorScheme={colorMode}  
        size="lg"
        icon={colorMode == "light" ? <FiMoon /> : <FiSun />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{userProfileInfo?.name}</Text>
                  <Text fontSize="xs" color="dark.600">
                    {userProfileInfo?.email}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'dark.900')}
              borderColor={useColorModeValue('dark.200', 'dark.700')}>
              <Center>
                <Avatar
                  size={'2xl'}
                  src={'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
                />
              </Center>
              <MenuDivider />

              <RouterLink to="/profile">
                <MenuItem>Profile</MenuItem>
              </RouterLink>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};