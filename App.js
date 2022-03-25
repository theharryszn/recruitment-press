import { LogBox } from "react-native";
import { StatusBar } from "native-base";
import { NativeBaseProvider } from "native-base";
import { enableScreens } from "react-native-screens";
import Navigator from "./navigator";
import AppLoading from "expo-app-loading";
import { customFonts, theme } from "./theme";
import { useFonts } from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider, onlineManager } from "react-query";
import NetInfo from '@react-native-community/netinfo'
import Store from "./context/Store"
import { getColor } from "tailwind-rn";
LogBox.ignoreAllLogs();

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
    <Store>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          <StatusBar backgroundColor={"#EC1F25"} animated barStyle="light-content"/>
          <Navigator />
        </NativeBaseProvider>
      </QueryClientProvider>
    </Store>
  );
  }
}
