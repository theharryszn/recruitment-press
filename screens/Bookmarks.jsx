import React from "react";
import { HStack, Text, VStack, FlatList, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import Media from "../components/Media";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import RenderHTML from "react-native-render-html";
import axios from "axios";
import { ArrowLeft } from "phosphor-react-native";
import { fonts } from "../theme";
import { StoreContext } from "../context/Store";

const headingStyle = {
  fontSize: 20,
};

const Bookmarks = () => {
  const { bookmarks } = React.useContext(StoreContext);
  const { goBack } = useNavigation();

  return (
    <VStack flex='1' pt='4'>
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

const SearchItem = ({ item }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const { width } = useWindowDimensions();

  const { navigate } = useNavigation();

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
        <Media id={data.featured_media} size='home-middle' rounded='md' />
        <VStack flex='1' justifyContent='space-between' space='2'>
          <RenderHTML
            contentWidth={width}
            baseStyle={headingStyle}
            source={{
              html: data.title.rendered,
            }}
          />
          <HStack>
            <Text color='gray.600'>{moment(data.date).format("ll")}</Text>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default Bookmarks;
