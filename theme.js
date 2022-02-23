import { extendTheme } from "native-base";
import {
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  } from "@expo-google-fonts/inter";
  
export const customFonts = {
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  };
  
  export const fonts = {
    thin: "Inter_100Thin",
    extraLight :"Inter_200ExtraLight",
    light: "Inter_300Light",
    regular :"Inter_400Regular",
    medium :"Inter_500Medium",
    semibold:"Inter_600SemiBold",
    bold: "Inter_700Bold",
    extraBold :"Inter_800ExtraBold",
    balck :"Inter_900Black",
  }
  
  export const theme = extendTheme({
    components: {
      Button: {
        defaultProps: {
          bg: "red.600",
        },
      },
    },
  });