/**
 * @author OpeAbidemi
 * @link https://github.com/OpeAbidemi
 * @description Built for Recruitment Press
 * @version 1.0
 *
 */

import axios from "axios";
import { VStack, Text } from "native-base";
import React from "react";

const CommentsList = ({ post }) => {
  const [comments, setComments] = React.useState(undefined);
  React.useEffect(() => {
    axios
      .get(post._links.replies[0].href)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
        setComments(null);
      });
  }, [post]);

  if (!comments) {
    return null;
  }

  return (
    <VStack p='2'>
      {comments.length === 0 ? (
        <Text fontSize='xl'>No Comments Yet</Text>
      ) : (
        <Text fontSize='xl'>Comments</Text>
      )}
    </VStack>
  );
};

export default CommentsList;
