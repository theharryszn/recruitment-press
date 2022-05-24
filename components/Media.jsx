/**
 * @author OpeAbidemi
 * @link https://github.com/OpeAbidemi
 * @description Built for Recruitment Press
 * @version 1.0
 *
 */

import axios from "axios";
import { HStack, Image } from "native-base";
import { useWindowDimensions } from "react-native";
import React from "react";
import { Briefcase } from "phosphor-react-native";

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
        console.log("media", err);
        setMedia(null);
      });
  }, [id]);

  if (
    media === undefined ||
    media === null ||
    !media?.media_details?.sizes[size]?.source_url
  ) {
    return (
      <HStack
        bg='gray.100'
        w={responsiveImg ? "full" : "24"}
        h='24'
        justifyContent='center'
        alignItems='center'
      >
        <Briefcase size={24} color='black' />
      </HStack>
    );
  }

  return (
    <Image
      alt={media.alt_text}
      source={{ uri: media?.media_details?.sizes[size]?.source_url || "" }}
      w={responsiveImg ? "full" : "24"}
      fallbackElement={() => (
        <HStack
          bg='gray.100'
          w={responsiveImg ? "full" : "24"}
          h='24'
          justifyContent='center'
          alignItems='center'
        >
          <Briefcase size={24} color='black' />
        </HStack>
      )}
      h={
        responsiveImg
          ? (width * media.media_details.height) / media.media_details.width
          : "24"
      }
      bg='gray.100'
      {...rest}
    />
  );
};

export default Media;
