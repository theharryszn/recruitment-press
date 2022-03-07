import React from "react";

export const StoreContext = React.createContext();

const Store = ({ children }) => {
  const [bookmarks, setBookmarks] = React.useState([]);
  const [likes, setLikes] = React.useState([]);

  const likePost = (id) => {
    if (id === null) return;
    setLikes([...likes, id]);
  };

  const addBookmark = (id) => {
    if (id === null) return;
    setBookmarks([...likes, id]);
  };

  const value = { bookmarks, likes, likePost, addBookmark };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default Store;
