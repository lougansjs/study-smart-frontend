import { Logo } from "@/shared";
import { BoxProps, useColorModeValue, Flex, Button, CloseButton, Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "./menu-item";
import { sidebarItems } from '@/stores';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
      {sidebarItems.map((link) => {
        return <MenuItem key={link.name} to={link.url} icon={link.icon}>
          {link.name}
        </MenuItem>
      })}
    </Box>
  );
};
