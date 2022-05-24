/**
 * @author OpeAbidemi
 * @link https://github.com/OpeAbidemi
 * @description Built for Recruitment Press
 * @version 1.0
 *
 */

import axios from "axios";
import { FlatList, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { fonts } from "../theme";
import moment from "moment";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Media from "./Media";
import RenderHTML from "react-native-render-html";

const headingStyle = {
  fontSize: 20,
};

const FeaturedPosts = ({ title = "Featured", category }) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setData([]);
    axios
      .get(
        `https://www.recruitmentpress.com/wp-json/wp/v2/posts?page=${Math.floor(
          Math.random() * 5
        )}&categories=${category?.id || 1}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, [category]);

  const { navigate } = useNavigation();

  const { width } = useWindowDimensions();

  return (
    <VStack bg='gray.100'>
      {data.length !== 0 && (
        <>
          <Text px='4' py='2' fontSize='xl' fontFamily={fonts.semibold}>
            {title}
          </Text>
          <FlatList
            horizontal
            data={data}
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
                  h='72'
                >
                  <VStack
                    bg='white'
                    mx='1'
                    p='3'
                    rounded='md'
                    alignItems='center'
                    space='2'
                    h='72'
                    w={width * 0.7}
                  >
                    <Media
                      id={item.featured_media}
                      size='home-middle'
                      rounded='md'
                      w='full'
                      responsiveImg
                      h='40'
                    />
                    <VStack flex='1' justifyContent='space-between' space='2'>
                      <RenderHTML
                        contentWidth={width}
                        baseStyle={headingStyle}
                        source={{
                          html: item.title.rendered,
                        }}
                      />
                      <HStack>
                        <Text color='gray.600'>
                          {moment(item.date).format("ll")}
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </Pressable>
              );
            }}
          />
        </>
      )}
    </VStack>
  );
};

export default FeaturedPosts;
