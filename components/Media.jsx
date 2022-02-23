import axios from "axios";
import { Image } from "native-base";
import { useWindowDimensions } from "react-native";
import React from "react";

const Media = ({ id, size = "full", responsiveImg = false, ...rest }) => {
  const [media, setMedia] = React.useState(null);
  const { width } = useWindowDimensions();
  React.useEffect(() => {
    axios
      .get(`http://recruitmentpress.com/wp-json/wp/v2/media/${id}`)
      .then((res) => {
        setMedia(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMedia(null);
      });
  }, [id]);

  if (media === undefined || media === null) {
    return null;
  }

  return (
    <Image
      alt={media.alt_text}
      source={{ uri: media?.media_details?.sizes[size]?.source_url || "" }}
      w={responsiveImg ? "full" : "24"}
      h={
        responsiveImg
          ? (width * media.media_details.height) / media.media_details.width
          : "24"
      }
      {...rest}
    />
  );
};

export default Media;
