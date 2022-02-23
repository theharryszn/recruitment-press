import { StatusBar, Linking } from "react-native";
import { NativeBaseProvider } from "native-base";
import { enableScreens } from "react-native-screens";
import Navigator from "./navigator";
import AppLoading from "expo-app-loading";
import { customFonts, theme } from "./theme";
import { useFonts } from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider, onlineManager } from "react-query";
import NetInfo from '@react-native-community/netinfo'

onlineManager.setEventListener(setOnline => {
 return NetInfo.addEventListener(state => {
   setOnline(state.isConnected)
})
})

enableScreens();

export default function App() {
  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    ...customFonts,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <StatusBar backgroundColor='white' animated barStyle='dark-content' />
        <Navigator />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
  }
}
