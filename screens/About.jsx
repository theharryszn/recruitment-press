/**
 * @author OpeAbidemi
 * @link https://github.com/OpeAbidemi
 * @description Built for Recruitment Press
 * @version 1.0
 *
 */

import React from "react";
import { HStack, Text, VStack, Pressable, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import { fonts } from "../theme";
import { Linking } from "react-native";

const About = () => {
  const { goBack } = useNavigation();

  return (
    <VStack
      flex='1'
      pt='4'
      _ios={{
        paddingTop: 10,
      }}
    >
      <HStack alignItems='center' space='4' px='4'>
        <Pressable
          p='2'
          onPress={() => {
            goBack();
          }}
        >
          <ArrowLeft color='black' size={22} />
        </Pressable>
        <Text fontFamily={fonts.bold} fontSize='3xl'>
          About
        </Text>
      </HStack>
      <VStack flex='1' py='4' justifyContent='center' alignItems='center'>
        <Image
          alt='logo'
          source={require("../assets/adaptive-icon.png")}
          width='32'
          height='32'
        />
        <Text color='black' fontFamily={fonts.bold} fontSize='xl'>
          Recruitment Press
        </Text>
        <Text color='black'>Version 1.0</Text>
        <Text color='black' fontSize='xs'>
          © Copyright {new Date().getFullYear()} Recruitment Press. All Rights
          Reserved
        </Text>
      </VStack>
      <VStack mb='20' alignItems='center'>
        <Pressable
          p='2'
          onPress={() => {
            Linking.openURL("https://github.com/OpeAbidemi");
          }}
        >
          <Text w='full' textAlign='center'>
            {" "}
            Developed by Ope Abidemi
          </Text>
        </Pressable>
        <Text color='black' fontSize='xs'>
          All Rights Reserved
        </Text>
      </VStack>
    </VStack>
  );
};

export default About;
