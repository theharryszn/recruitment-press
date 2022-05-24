/**
 * @author OpeAbidemi
 * @link https://github.com/OpeAbidemi
 * @description Built for Recruitment Press
 * @version 1.0
 *
 */

import React from "react";
import {
  HStack,
  Text,
  TextField,
  VStack,
  FlatList,
  Spinner,
  Pressable,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ArrowLeft } from "phosphor-react-native";
import { fonts } from "../theme";
import { SearchItem } from "./Bookmarks";

const Search = () => {
  const [data, setData] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { goBack } = useNavigation();

  const search = () => {
    setLoading(true);
    axios
      .get(
        `https://www.recruitmentpress.com/wp-json/wp/v2/search?search=${searchText}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  };

  return (
    <VStack
      flex='1'
      pt='4'
      _ios={{
        paddingTop: 10,
      }}
    >
      <HStack alignItems='center' space='4' px='4'>
        <Pressable
          p='2'
          onPress={() => {
            goBack();
          }}
        >
          <ArrowLeft color='black' size={22} />
        </Pressable>
        <Text fontFamily={fonts.bold} fontSize='3xl'>
          Search
        </Text>
      </HStack>
      <HStack p='4' alignItems='center' justifyContent='center'>
        <TextField
          onChangeText={(t) => {
            setSearchText(t);
            search();
          }}
          w='full'
          placeholder='Search'
          rounded='lg'
          fontSize='md'
          borderWidth={0}
          bg='coolGray.100'
        />
      </HStack>
      <VStack>
        {!loading ? (
          searchText.length !== 0 ? (
            data.length !== 0 ? (
              <FlatList
                data={data}
                p='2'
                // eslint-disable-next-line react-native/no-inline-styles
                contentContainerStyle={{
                  paddingBottom: 150,
                }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                  return <SearchItem item={item} />;
                }}
              />
            ) : (
              <VStack py='10' alignItems='center' justifyContent='center'>
                <Text>No Result</Text>
              </VStack>
            )
          ) : (
            <VStack py='10' alignItems='center' justifyContent='center'>
              <Text>Enter Something to Search</Text>
            </VStack>
          )
        ) : (
          <VStack py='10' alignItems='center' justifyContent='center'>
            <Spinner size='sm' color='red.600' />
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};

export default Search;
