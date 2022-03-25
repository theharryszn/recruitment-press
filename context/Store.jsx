import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StoreContext = React.createContext();

const Store = ({ children }) => {
  const [bookmarks, setBookmarks] = React.useState([]);
  const [likes, setLikes] = React.useState([]);

  React.useEffect(() => {
    async function getItems() {
      try {
        const items = await AsyncStorage.getItem("bookmarks");
        setBookmarks(JSON.parse(items));
      } catch (e) {
        //
        console.log(e);
      }
    }

    getItems();
  }, []);

  const likePost = (id) => {
    if (id === null) return;
    setLikes([...likes, id]);
  };

  const addBookmark = async (id) => {
    if (id === null) return;
    setBookmarks([...likes, id]);
    try {
      const items = JSON.stringify(bookmarks);
      await AsyncStorage.setItem("bookmarks", items);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const value = { bookmarks, likes, likePost, addBookmark };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default Store;
