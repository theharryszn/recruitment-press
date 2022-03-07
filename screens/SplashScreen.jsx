import { StackActions, useNavigation } from "@react-navigation/native";
import { Spinner, Text, VStack } from "native-base";
import React from "react";
import { fonts } from "../theme";

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
      <VStack alignItems='center'>
        <Text fontSize='3xl' fontFamily={fonts.medium}>
          Recruitment Press
        </Text>
        <Text fontSize='md' color='red.600' fontFamily={fonts.medium}>
          Unlimited opportunities
        </Text>
      </VStack>
      <Spinner size='lg' color='red.600' />
    </VStack>
  );
};

export default SplashScreen;
