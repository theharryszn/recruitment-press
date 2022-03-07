import { HStack, Pressable, ScrollView, View } from "native-base";
import { House } from "phosphor-react-native";
import React from "react";
import FeaturedPosts from "../components/FeaturedPosts";
import HomeHeader from "../components/HomeHeader";
import PostList from "../components/PostList";

const Home = () => {
  const [category, setCategory] = React.useState({
    id: "All",
    name: "All",
  });
  const changeCategory = React.useCallback((cat) => {
    setCategory(cat);
  }, []);

  return (
    <View>
      <HomeHeader changeCategory={changeCategory} />
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        <FeaturedPosts category={category} />
        <PostList category={category} />
      </ScrollView>
      {/* <HStack
        position='absolute'
        w='full'
        px='4'
        py='2'
        alignItems='center'
        bottom='0'
        justifyContent='center'
      >
        <Pressable p='2'>
          <House size={22} color='black' />
        </Pressable>
      </HStack> */}
    </View>
  );
};

export default Home;
