import axios from "axios";
import {
  Button,
  FlatList,
  HStack,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React from "react";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Media from "./Media";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import RenderHTML from "react-native-render-html";
import { StoreContext } from "../context/Store";
import { BookmarkSimple, Heart } from "phosphor-react-native";

const headingStyle = {
  fontSize: 20,
};

const PostList = ({ category }) => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  const {
    likePost,
    addBookmark,
    likes,
    bookmarks,
    removeBookmark,
    removeLike,
  } = React.useContext(StoreContext);

  React.useEffect(() => {
    setLoading(true);
    if (category.name === "All") {
      axios
        .get(
          `https://www.recruitmentpress.com/wp-json/wp/v2/posts?page=${page}`
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    } else {
      axios
        .get(
          `https://www.recruitmentpress.com/wp-json/wp/v2/posts?page=${page}&categories=${
            category?.id || 1
          }`
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    }
  }, [page, category]);

  const { width } = useWindowDimensions();

  const { navigate } = useNavigation();

  if (loading) {
    return (
      <VStack alignItems='center' justifyContent='center' py='40' flex='1'>
        <Spinner size='sm' color='red.600' />
      </VStack>
    );
  }

  return (
    <FlatList
      data={data}
      p='2'
      bg='gray.100'
      ListFooterComponent={
        <HStack p='4' pb='10' alignItems='center' justifyContent='center'>
          <Button
            onPress={() => setPage(page + 1)}
            p='4'
            w='1/2'
            rounded='full'
          >
            See More
          </Button>
        </HStack>
      }
      refreshing={loading}
      onRefresh={() => setPage(page)}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigate("Post", {
                post: item,
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
              <Media id={item.featured_media} size='home-middle' rounded='md' />
              <VStack flex='1' justifyContent='space-between' space='2'>
                <RenderHTML
                  contentWidth={width}
                  baseStyle={headingStyle}
                  source={{
                    html: item.title.rendered || "",
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
                        weight={
                          bookmarks.includes(item.id) ? "fill" : "regular"
                        }
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
      }}
    />
  );
};

export default PostList;
