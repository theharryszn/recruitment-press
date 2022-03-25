import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StoreContext = React.createContext();

const Store = ({ children }) => {
  const [bookmarks, setBookmarks] = React.useState([]);
  const [likes, setLikes] = React.useState([]);

  React.useEffect(() => {
    async function getItems() {
      try {
        const itemsB = await AsyncStorage.getItem("bookmarks");
        setBookmarks(itemsB ? JSON.parse(itemsB) : []);
      } catch (e) {
        //
        console.log(e);
      }

      try {
        const itemsL = await AsyncStorage.getItem("likes");
        setLikes(itemsL ? JSON.parse(itemsL) : []);
      } catch (e) {
        //
        console.log(e);
      }
    }

    getItems();
  }, []);

  const likePost = async (id) => {
    if (id === null) return;
    setLikes([...likes, id]);
    try {
      const items = JSON.stringify(likes);
      await AsyncStorage.setItem("likes", items);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  React.useEffect(() => {
    const update = async () => {
      try {
        const items = JSON.stringify(bookmarks);
        await AsyncStorage.setItem("bookmarks", items);
      } catch (e) {
        // saving error
        console.log(e);
      }
    };
    update();
  }, [bookmarks]);

  React.useEffect(() => {
    const update = async () => {
      try {
        const items = JSON.stringify(likes);
        await AsyncStorage.setItem("likes", items);
      } catch (e) {
        // saving error
        console.log(e);
      }
    };
    update();
  }, [likes]);

  const addBookmark = async (id) => {
    if (id === null) return;
    setBookmarks([...likes, id]);
  };

  const removeLike = async (id) => {
    if (id === null) return;
    setLikes(likes.filter((i) => id !== i));
  };
  const removeBookmark = async (id) => {
    if (id === null) return;
    setBookmarks(bookmarks.filter((i) => id !== i));
  };

  const value = {
    bookmarks,
    likes,
    likePost,
    addBookmark,
    removeLike,
    removeBookmark,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default Store;
