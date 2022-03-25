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
import {
  BookmarkSimple,
  CaretLeft,
  Heart,
  ShareNetwork,
} from "phosphor-react-native";
import React from "react";
import { useWindowDimensions, Share } from "react-native";
import RenderHTML from "react-native-render-html";
import { getColor } from "tailwind-rn";
import CommentsList from "../components/CommentsList";
import Media from "../components/Media";
import ReccomendedPosts from "../components/RecommendedPosts";
import { fonts } from "../theme";
import { StoreContext } from "../context/Store";

const baseStyle = {
  fontSize: 20,
};

const headingStyle = {
  fontSize: 38,
};

const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: "black",
  },
  a: {
    color: getColor("red-600"),
  },
};

const Post = ({ route }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const scrollRef = React.useRef();
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://recruitmentpress.com/wp-json/wp/v2/posts/${route.params.post.id}`
      )
      .then((res) => {
        setLoading(false);
        setData(res.data);
        console.log(res.data.id);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [route]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [scrollRef, route]);

  const { width, height } = useWindowDimensions();

  const { goBack, navigate } = useNavigation();
  const { likePost, addBookmark, likes, bookmarks } =
    React.useContext(StoreContext);

  return (
    <View flex='1'>
      <HStack px='4' py='2' w='full' justifyContent='space-between'>
        <Pressable
          _pressed={{
            opacity: 0.5,
          }}
          rounded='full'
          p='2'
          onPress={() => goBack()}
        >
          <CaretLeft weight='regular' color='black' size={22} />
        </Pressable>
        <HStack space='2'>
          <Pressable
            _pressed={{
              opacity: 0.5,
            }}
            rounded='full'
            p='2'
            onPress={() => likePost(data !== null ? data.id : null)}
          >
            <Heart
              weight={likes.includes(route.params.post.id) ? "fill" : "regular"}
              color={likes.includes(route.params.post.id) ? "#EC1F25" : "black"}
              size={22}
            />
          </Pressable>
          <Pressable
            _pressed={{
              opacity: 0.5,
            }}
            rounded='full'
            p='2'
            onPress={() => addBookmark(data !== null ? data.id : null)}
          >
            <BookmarkSimple
              weight={
                bookmarks.map((p) => p.id).includes(route.params.post.id)
                  ? "fill"
                  : "regular"
              }
              color='black'
              size={22}
            />
          </Pressable>
          <Pressable
            _pressed={{
              opacity: 0.5,
            }}
            rounded='full'
            p='2'
            onPress={() =>
              Share.share({
                url: data.link,
                message: `Read ${data.link}`,
              })
            }
          >
            <ShareNetwork color='black' size={22} />
          </Pressable>
        </HStack>
      </HStack>
      <ScrollView p='1' ref={scrollRef}>
        {loading !== true && data !== null ? (
          <>
            <Media
              id={data.featured_media}
              rounded='md'
              bg='gray.200'
              resizeMode='cover'
              responsiveImg
            />
            <VStack p='2' space='2'>
              <RenderHTML
                contentWidth={width}
                baseStyle={headingStyle}
                source={{
                  html: data.title.rendered,
                }}
              />
              <HStack>
                <Text color='main' fontSize='md'>
                  {moment(data.date).calendar()}
                </Text>
              </HStack>
              <RenderHTML
                contentWidth={width}
                source={{
                  html: data.content.rendered.replace("<p>&nbsp;</p>", ""),
                }}
                baseStyle={baseStyle}
                tagsStyles={tagsStyles}
                renderersProps={{
                  a: {
                    onPress: (e, url) => {
                      navigate("Browser", {
                        url,
                      });
                    },
                  },
                }}
                enableCSSInlineProcessing
                systemFonts={[fonts.regular]}
              />
              <CommentsList post={data} />
              <ReccomendedPosts title='More' />
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
