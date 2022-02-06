import { FlatList, HStack, Pressable, Text, VStack } from "native-base";
import { MagnifyingGlass } from "phosphor-react-native";
import React from "react";
import { fonts } from "../theme";

const tabs = [
  "Trending",
  "Recruitment/Jobs",
  "NYSC Updates",
  "News",
  "Jamb Updates",
  "Education/Admissions",
];

const TabBar = () => {
  const [active, setActive] = React.useState(0);
  return (
    <FlatList
      horizontal
      data={tabs}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <Pressable onPress={() => setActive(index)}>
            <Text
              p='3'
              mx='2'
              borderBottomWidth='2'
              borderBottomColor={active === index ? "red.500" : "transparent"}
            >
              {item}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

const HomeHeader = () => {
  return (
    <VStack>
      <HStack
        px='6'
        py='3'
        alignItems='center'
        osition='absolute'
        top='0'
        left='0'
        w='full'
        elevation={2}
        zIndex={90}
        // borderBottomColor='red.100'
        // borderBottomWidth='0.5'
        justifyContent='space-between'
      >
        <Text fontSize='lg' fontFamily={fonts.medium}>
          Recruitment Press
        </Text>
        <Pressable py='2'>
          <MagnifyingGlass color='black' size={22} />
        </Pressable>
      </HStack>
      <Text px='4' fontFamily={fonts.bold} fontSize='3xl'>
        Explore
      </Text>
      <TabBar />
    </VStack>
  );
};

export default HomeHeader;
