import { StatusBar } from "react-native";
import { extendTheme, NativeBaseProvider } from "native-base";
import { enableScreens } from "react-native-screens";
import Navigator from "./navigator";
import {
  useFonts,
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
import AppLoading from "expo-app-loading";
enableScreens();


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

const theme = extendTheme({
  components: {
    Text: {
      defaultProps: {
        fontFamily: "Inter_400Regular",
      },
    },
    Button: {
      defaultProps: {
        bg: "red.600",
      },
    },
  },
});

export default function App() {

  const [fontsLoaded] = useFonts({
    ...customFonts,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar backgroundColor='white' animated barStyle='dark-content' />
      <Navigator />
    </NativeBaseProvider>
  );
  }
}
