import axios from "axios";
import { Button, FlatList, HStack, Spinner, Text, VStack } from "native-base";
import React from "react";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Media from "./Media";

const PostList = () => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.recruitmentpress.com/wp-json/wp/v2/posts?page=${page}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, [page]);

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
          <Button onPress={() => setPage(page + 1)} py='2'>
            See More
          </Button>
        </HStack>
      }
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
                <Text fontSize='lg'>{item.title.rendered}</Text>
                <HStack>
                  <Text color='gray.600'>{moment(item.date).format("ll")}</Text>
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
