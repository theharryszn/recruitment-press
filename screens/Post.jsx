import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";
import {
  HStack,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  View,
  VStack,
} from "native-base";
import { CaretLeft } from "phosphor-react-native";
import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import { getColor } from "tailwind-rn";
import Media from "../components/Media";
import { fonts } from "../theme";

const baseStyle = {
  fontSize: 20,
  fontFamily: fonts.regular,
};

const Post = ({ route }) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(
        `https://recruitmentpress.com/wp-json/wp/v2/posts/${route.params.post.id}`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [route]);

  const { width, height } = useWindowDimensions();

  const { goBack } = useNavigation();

  return (
    <View flex='1'>
      <HStack
        px='6'
        py='4'
        position='absolute'
        top='0'
        left='0'
        w='full'
        elevation={2}
        zIndex={90}
      >
        <Pressable
          _pressed={{
            opacity: 0.5,
          }}
          bg={getColor("black opacity-10")}
          rounded='full'
          p='2'
          onPress={() => goBack()}
        >
          <CaretLeft weight='bold' color='black' size={22} />
        </Pressable>
      </HStack>
      <ScrollView p='1'>
        {data !== null ? (
          <>
            <Media
              id={data.featured_media}
              rounded='md'
              bg='gray.200'
              w='full'
              resizeMode='cover'
              h='64'
            />
            <VStack p='2' space='2'>
              <Text fontSize='2xl' fontFamily={fonts.bold}>
                {data.title.rendered}
              </Text>
              <HStack>
                <Text fontSize='md' fontFamily={fonts.semibold}>
                  {moment(data.date).fromNow()}
                </Text>
              </HStack>
              <RenderHTML
                contentWidth={width}
                source={{
                  html: data.content.rendered,
                }}
                baseStyle={baseStyle}
                enableCSSInlineProcessing
                systemFonts={[fonts.regular]}
              />
            </VStack>
          </>
        ) : (
          <VStack h={height} alignItems='center' justifyContent='center'>
            <Spinner size='sm' color='red.600' />
          </VStack>
        )}
      </ScrollView>
    </View>
  );
};

export default Post;