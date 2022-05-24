/**
 * @author OpeAbidemi
 * @link https://github.com/OpeAbidemi
 * @description Built for Recruitment Press
 * @version 1.0
 *
 */

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FlatList, HStack, Pressable, Text, VStack } from "native-base";
import { Bookmarks, House, Info, MagnifyingGlass } from "phosphor-react-native";
import React from "react";
import { fonts } from "../theme";

export const TabBar = ({ changeCategory }) => {
  const [active, setActive] = React.useState(0);
  const [categories, setCategories] = React.useState([
    {
      id: "All",
      name: "All",
    },
  ]);

  React.useEffect(() => {
    axios
      .get("https://recruitmentpress.com/wp-json/wp/v2/categories")
      .then((res) => {
        setCategories([
          {
            id: "All",
            name: "All",
          },
          ...res.data,
        ]);
        changeCategory(categories[0]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeCategory]);

  const flatList = React.useRef();

  React.useEffect(() => {
    flatList.current?.scrollToIndex({
      index: active,
      animated: true,
    });
  }, [active]);
  return (
    <FlatList
      horizontal
      ref={flatList}
      data={categories}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      initialScrollIndex={active}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              setActive(index);
              changeCategory(item);
            }}
            p='3'
            mx='2'
            borderBottomWidth='2'
            borderBottomColor={active === index ? "white" : "transparent"}
          >
            {item.name === "All" ? (
              <HStack space='2' alignItems='center'>
                <House color='white' size={18} />
                <Text fontSize='lg' color='white'>
                  {item.name}
                </Text>
              </HStack>
            ) : (
              <Text fontSize='lg' color='white'>
                {item.name}
              </Text>
            )}
          </Pressable>
        );
      }}
    />
  );
};

const HomeHeader = ({ changeCategory }) => {
  const { navigate } = useNavigation();
  return (
    <VStack
      backgroundColor='#EC1F25'
      _ios={{
        paddingTop: 10,
      }}
    >
      <HStack
        px='6'
        py='3'
        alignItems='center'
        top='0'
        left='0'
        w='full'
        elevation={2}
        zIndex={90}
        // borderBottomColor='red.100'
        // borderBottomWidth='0.5'
        justifyContent='space-between'
      >
        <VStack>
          <Text color='white' fontFamily={fonts.bold} fontSize='3xl'>
            Explore
          </Text>
          <Text color='white' fontFamily={fonts.medium}>
            Get the latest updates
          </Text>
        </VStack>
        <HStack space='2'>
          <Pressable p='2' onPress={() => navigate("Search")}>
            <MagnifyingGlass color='white' size={22} />
          </Pressable>
          <Pressable p='2' onPress={() => navigate("Bookmarks")}>
            <Bookmarks color='white' size={22} />
          </Pressable>
          <Pressable p='2' onPress={() => navigate("About")}>
            <Info color='white' size={22} />
          </Pressable>
        </HStack>
      </HStack>

      <TabBar changeCategory={changeCategory} />
    </VStack>
  );
};

export default HomeHeader;
