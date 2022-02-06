import { ScrollView, View } from "native-base";
import React from "react";
import FeaturedPosts from "../components/FeaturedPosts";
import HomeHeader from "../components/HomeHeader";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <View>
      <HomeHeader />
      <ScrollView mb='32'>
        <FeaturedPosts />
        <PostList />
      </ScrollView>
    </View>
  );
};

export default Home;
