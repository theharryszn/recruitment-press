import axios from "axios";
import { Image } from "native-base";
import React from "react";
import { set } from "react-native-reanimated";

const Media = ({ id, size = "full", ...rest }) => {
  const [media, setMedia] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`http://recruitmentpress.com/wp-json/wp/v2/media/${id}`)
      .then((res) => {
        setMedia(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMedia(null);
      });
  }, [id]);

  if (media === null) {
    return null;
  }

  return (
    <Image
      alt={media.alt_text}
      source={{ uri: media.media_details.sizes[size].source_url }}
      w='24'
      h='24'
      {...rest}
    />
  );
};

export default Media;
