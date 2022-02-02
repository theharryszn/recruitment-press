import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { enableScreens } from "react-native-screens";
import Navigator from "./navigator";
enableScreens()

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor='white' animated style='dark' />
      <Navigator />
    </NativeBaseProvider>
  );
}
