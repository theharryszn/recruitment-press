import { Spinner, Text, VStack } from "native-base";
import React from "react";
import { fonts } from "../App";

const SplashScreen = () => {
  return (
    <VStack
      flex='1'
      alignItems='center'
      justifyContent='space-between'
      py='1/4'
    >
      <Text fontSize='3xl' fontFamily={fonts.semibold}>
        Recruitment Press
      </Text>
      <Spinner size='lg' color='red.600' />
    </VStack>
  );
};

export default SplashScreen;
