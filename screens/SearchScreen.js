import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { fallbackMoviePoster, image185, searchMovies } from "../Api/Database";
var { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  let Nama = "Ant-Man and the Wasp: Quantumania";
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const handleSearch = (value) => {
    searchMovies({
      query: value,
      include_adults: false,
      language: "en-US",
      page: "1",
    }).then((data) => {
      if (data && data.results) setResult(data.results);
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-900`}>
      <View
        style={tw`mx-4 mt-3 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
        <TextInput
          onChangeText={handleSearch}
          placeholder="Search Movie..."
          placeholderTextColor={"lightgray"}
          style={tw`px-4 py-2 text-base font-semibold text-white`}></TextInput>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={tw`rounded-full p-3 m-1 bg-neutral-500`}>
          <XMarkIcon size="25" color="white"></XMarkIcon>
        </TouchableOpacity>
      </View>
      {result.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={tw`gap-y-3`}>
          <Text style={tw`text-white font-semibold ml-1 mt-2`}>
            Results({result.length})
          </Text>
          <View style={tw`flex-row justify-between flex-wrap`}>
            {result.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    navigation.push("Movie", item);
                  }}>
                  <View style={tw`gap-y-2 mb-4`}>
                    <Image
                      // source={require("../assets/images/moviePoster1.png")}
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                        marginTop: 15,
                        borderRadius: 30,
                      }}></Image>
                    <Text style={tw`text-white ml-1`}>
                      {item?.title.length > 14
                        ? item?.title.slice(0, 20) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-white text-lg`}>No result Found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
