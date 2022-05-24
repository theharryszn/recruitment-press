/**
 * @author OpeAbidemi
 * @link https://github.com/OpeAbidemi
 * @description Built for Recruitment Press
 * @version 1.0
 *
 */

import { ScrollView, View } from "native-base";
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
    </View>
  );
};

export default Home;
