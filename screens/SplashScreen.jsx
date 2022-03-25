import { StackActions, useNavigation } from "@react-navigation/native";
import { Image, Spinner, VStack } from "native-base";
import React from "react";

const SplashScreen = () => {
  const { dispatch } = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(StackActions.replace("Home"));
    }, 3000);
  });

  return (
    <VStack
      flex='1'
      alignItems='center'
      justifyContent='space-between'
      py='1/4'
    >
      <Image
        alt='logo'
        source={require("../assets/adaptive-icon.png")}
        width='32'
        height='32'
      />
      <Spinner size='lg' color='red.600' />
    </VStack>
  );
};

export default SplashScreen;
