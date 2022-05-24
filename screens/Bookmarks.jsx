/**
 * @author OpeAbidemi
 * @link https://github.com/OpeAbidemi
 * @description Built for Recruitment Press
 * @version 1.0
 *
 */

import React from "react";
import { HStack, Text, VStack, FlatList, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import Media from "../components/Media";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import RenderHTML from "react-native-render-html";
import axios from "axios";
import { ArrowLeft, BookmarkSimple, Heart } from "phosphor-react-native";
import { fonts } from "../theme";
import { StoreContext } from "../context/Store";

const headingStyle = {
  fontSize: 20,
};

const Bookmarks = () => {
  const { bookmarks } = React.useContext(StoreContext);
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
          Bookmarks
        </Text>
      </HStack>
      <VStack>
        {bookmarks.length !== 0 ? (
          <FlatList
            data={bookmarks}
            p='2'
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{
              paddingBottom: 150,
            }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
              return <SearchItem item={item} />;
            }}
          />
        ) : (
          <VStack py='10' alignItems='center' justifyContent='center'>
            <Text>No Bookmarks</Text>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};

export const SearchItem = ({ item }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const { width } = useWindowDimensions();

  const { navigate } = useNavigation();

  const {
    likePost,
    addBookmark,
    likes,
    bookmarks,
    removeBookmark,
    removeLike,
  } = React.useContext(StoreContext);

  console.log(item);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`https://recruitmentpress.com/wp-json/wp/v2/posts/${item}`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [item]);

  if (loading || !data) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigate("Post", {
          post: { id: item },
        });
      }}
    >
      <HStack
        bg='white'
        my='1'
        p='3'
        rounded='md'
        alignItems='center'
        space='2'
      >
        <Media id={data.featured_media} size='home-middle' rounded='md' />
        <VStack flex='1' justifyContent='space-between' space='2'>
          <RenderHTML
            contentWidth={width}
            baseStyle={headingStyle}
            source={{
              html: data.title.rendered,
            }}
          />
          <HStack justifyContent='space-between'>
            <Text color='gray.600'>{moment(item.date).format("ll")}</Text>
            <HStack space='2'>
              <Pressable
                _pressed={{
                  opacity: 0.5,
                }}
                rounded='full'
                p='2'
                onPress={() =>
                  likes.includes(item.id)
                    ? removeLike(item.id)
                    : likePost(item.id)
                }
              >
                <Heart
                  weight={likes.includes(item.id) ? "fill" : "regular"}
                  color={likes.includes(item.id) ? "#E44141" : "black"}
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
                  bookmarks.includes(item.id)
                    ? removeBookmark(item.id)
                    : addBookmark(item.id)
                }
              >
                <BookmarkSimple
                  weight={bookmarks.includes(item.id) ? "fill" : "regular"}
                  color='black'
                  size={22}
                />
              </Pressable>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default Bookmarks;
