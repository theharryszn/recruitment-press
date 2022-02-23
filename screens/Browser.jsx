import React from "react";
import {
  HStack,
  Pressable,
  Progress,
  Spinner,
  Text,
  VStack,
} from "native-base";
import WebView from "react-native-webview";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowClockwise,
  CaretLeft,
  CaretRight,
  ArrowSquareOut,
  X,
} from "phosphor-react-native";

const Browser = (props) => {
  const uri = React.useState(props.route.params.url)[0];
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const { goBack } = useNavigation();
  const ref = React.useRef();

  return (
    <VStack flex='1'>
      <HStack p='2'>
        <Pressable
          p='2'
          onPress={() => {
            goBack();
          }}
        >
          <X color='black' size={20} />
        </Pressable>
        <HStack bg='gray.100' alignItems='center' rounded='lg' flex='1' px='2'>
          <HStack justifyContent='center' alignItems='center' flex='1'>
            <Text fontSize='md' numberOfLines={1}>
              {uri}
            </Text>
          </HStack>
          <Pressable p='2' onPress={() => ref.current.reload()}>
            <ArrowClockwise color='black' size={18} />
          </Pressable>
          <Pressable p='2' onPress={() => ref.current.goBack()}>
            <CaretLeft color='black' size={20} />
          </Pressable>
          <Pressable p='2' onPress={() => ref.current.goForward()}>
            <CaretRight color='black' size={20} />
          </Pressable>
        </HStack>
        <Pressable p='2' onPress={() => Linking.openURL(uri)}>
          <ArrowSquareOut color='black' size={20} />
        </Pressable>
      </HStack>
      <Progress
        value={loadingProgress * 100}
        h='0.5'
        _filledTrack={{
          bg: "red.500",
        }}
        bg='red.100'
      />
      <WebView
        source={{ uri }}
        ref={ref}
        onLoadProgress={({ nativeEvent }) => {
          setLoadingProgress(nativeEvent.progress);
        }}
        renderLoading={() => (
          <VStack flex='1'>
            <Spinner size='sm' />
          </VStack>
        )}
      />
    </VStack>
  );
};

export default Browser;
