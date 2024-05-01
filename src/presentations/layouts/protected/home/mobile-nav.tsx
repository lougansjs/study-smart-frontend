import { UserProfileData } from "@/stores";
import { Avatar, Box, Center, Flex, FlexProps, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuList, Text, VStack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FiMenu, FiMoon, FiSun, FiBell, FiChevronDown } from "react-icons/fi";
import { MenuItem } from "./menu-item";
import { profileMenuItems } from "@/stores/slices/profile-menu-slice";

interface MobileNavProps extends FlexProps {
  onOpen: () => void;
  handleLogout: () => void;
  userProfileInfo: UserProfileData;
}

export const MobileNav = ({ onOpen, handleLogout, userProfileInfo, ...rest }: MobileNavProps) => {
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

               {profileMenuItems.map((item) => {
                 return <MenuItem key={item.name} to={item.url}>
                   {item.name}
                 </MenuItem>
               })} 
             </MenuList>
           </Menu>
         </Flex>
       </HStack>
    </Flex>
  );
};