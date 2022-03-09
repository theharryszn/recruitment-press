import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FlatList, HStack, Pressable, Text, VStack } from "native-base";
import { House, MagnifyingGlass } from "phosphor-react-native";
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
  }, [changeCategory, categories]);
  return (
    <FlatList
      horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
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
              <HStack space='2'>
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
    <VStack bg='red.500'>
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
        <Text color='white' fontFamily={fonts.bold} fontSize='3xl'>
          Explore
        </Text>
        <Pressable py='2' onPress={() => navigate("Search")}>
          <MagnifyingGlass color='white' size={22} />
        </Pressable>
      </HStack>

      <TabBar changeCategory={changeCategory} />
    </VStack>
  );
};

export default HomeHeader;
