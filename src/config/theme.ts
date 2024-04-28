import { Colors, extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors: Colors = {
  dark: {
    50: "#f5f5f5",
    100: "#e0e0e0",
    200: "#bdbdbd",
    300: "#9e9e9e",
    400: "#757575",
    500: "#616161",
    600: "#424242",
    700: "#303030",
    800: "#252525",
    900: "#212121",
  }
}

export const theme = extendTheme({
  config, colors
})
