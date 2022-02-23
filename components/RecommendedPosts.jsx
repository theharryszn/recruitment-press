import axios from "axios";
import { FlatList, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { fonts } from "../theme";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import Media from "./Media";

const ReccomendedPosts = ({ title = "Reccomended" }) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        `https://www.recruitmentpress.com/wp-json/wp/v2/posts?page=${Math.floor(
          Math.random() * 5
        )}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const { navigate } = useNavigation();

  return (
    <VStack>
      <Text px='4' py='2' fontSize='xl' fontFamily={fonts.semibold}>
        {title}
      </Text>
      <FlatList
        data={data.slice(0, 4)}
        p='2'
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <Pressable
              activeOpacity={0.8}
              onPress={() => {
                navigate("Post", {
                  post: item,
                });
              }}
            >
              <HStack
                bg='white'
                mx='1'
                p='3'
                rounded='md'
                alignItems='center'
                space='2'
                w='full'
              >
                <Media
                  id={item.featured_media}
                  size='home-middle'
                  rounded='md'
                  w='20'
                  h='20'
                />
                <VStack flex='1' justifyContent='space-between' space='2'>
                  <Text fontSize='lg' numberOfLines={3}>
                    {item.title.rendered}
                  </Text>
                  <HStack>
                    <Text color='gray.600'>
                      {moment(item.date).format("ll")}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Pressable>
          );
        }}
      />
    </VStack>
  );
};

export default ReccomendedPosts;
