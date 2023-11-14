import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../Api/Database";
const ios = Platform.OS == "ios";
var { width, height } = Dimensions.get("window");
const PersonScreen = () => {
  const navigation = useNavigation();
  const [moviesPerson, setMoviesPerson] = useState([]);
  const [person, setPerson] = useState([]);
  const { params: item } = useRoute();
  useEffect(() => {
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (personId) => {
    const data = await fetchPersonDetails(personId);
    if (data) setPerson(data);
  };
  const getPersonMovies = async (personId) => {
    const data = await fetchPersonMovies(personId);
    if (data.cast) setMoviesPerson(data.cast);
  };
  return (
    <ScrollView
      style={tw`flex-1 bg-neutral-900`}
      contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={tw`w-full`}>
        <StatusBar style="light"></StatusBar>
        <SafeAreaView
          style={tw`flex-row justify-between items-center z-20 px-4 mt-8`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronDoubleLeftIcon
              size={30}
              strokeWidth={4}
              color="white"
              style={tw`  rounded-lg mt-4 ml-1`}></ChevronDoubleLeftIcon>
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <View style={tw`flex-row justify-center`}>
            <View
              style={tw`items-center rounded-full overflow-hidden h-72 w-72  border-4 border-gray-400 `}>
              <Image
                // source={require("../assets/images/castImage1.png")}
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}></Image>
            </View>
          </View>
          <View style={tw`mt-6`}>
            <Text style={tw`text-3xl text-white font-bold text-center`}>
              {person?.name}
            </Text>
            <Text style={tw`text-base text-gray-400  text-center`}>
              {person?.place_of_birth}
            </Text>
          </View>
          <View
            style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
            <View style={tw`border-r-2 border-r-gray-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Gender</Text>
              <Text style={tw`text-gray-400 text-sm`}>
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View style={tw`border-r-2 border-r-gray-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Birth</Text>
              <Text style={tw`text-gray-400 text-sm`}>{person?.birthday}</Text>
            </View>
            <View style={tw`border-r-2 border-r-gray-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Known for</Text>
              <Text style={tw`text-gray-400 text-sm`}>
                {person?.known_for_department}
              </Text>
            </View>
            <View style={tw` px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Popularity</Text>
              <Text style={tw`text-gray-400 text-sm`}>
                {person?.popularity?.toFixed(2)}%
              </Text>
            </View>
          </View>
          <View style={tw`my-6 mx-4 gap-y-2`}>
            <Text style={tw`text-white text-lg`}>Biography</Text>
            <Text style={tw`text-gray-400`}>{person?.biography}</Text>
          </View>
          <MovieList
            title="Movies"
            data={moviesPerson}
            hideSeeAll={true}></MovieList>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonScreen;
