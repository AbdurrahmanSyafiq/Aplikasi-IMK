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
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../Api/Database";
const ios = Platform.OS == "ios";
var { width, height } = Dimensions.get("window");
const MovieScreen = () => {
  let Nama = "Ant-Man and the Wasp: Quantumania";
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
  };
  const getMovieCredits = async (movieId) => {
    const data = await fetchMovieCredits(movieId);
    if (data && data.cast) setCast(data.cast);
  };
  const getSimilarMovies = async (movieId) => {
    const data = await fetchSimilarMovies(movieId);
    if (data && data.results) setSimilar(data.results);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={tw`flex-1 bg-neutral-900`}>
      <View style={tw`w-full`}>
        <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-2 mt-2`}>
          <StatusBar style="light"></StatusBar>
          <View
            style={tw`flex-row justify-between items-center absolute z-20 px-4 mt-8`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronDoubleLeftIcon
                size={30}
                strokeWidth={4}
                color="white"
                style={tw`  rounded-lg mt-4 ml-1`}></ChevronDoubleLeftIcon>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              //   source={require("../assets/images/moviePoster1.png")}
              source={{ uri: image500(movie?.poster_path) }}
              style={{ width, height: height * 0.55 }}></Image>
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23,23,23,0.8)",
                "rgba(23,23,23, 1)",
              ]}
              style={{
                width,
                height: height * 0.4,
                position: "absolute",
                bottom: 0,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}></LinearGradient>
          </View>
          <View style={{ marginTop: -(height * 0.09), marginBottom: 16 }}>
            <Text style={tw`text-white text-3xl text-center font-bold`}>
              {movie?.title}
            </Text>
            <Text
              style={tw`text-gray-400 font-semibold text-base text-center mt-2`}>
              {movie?.status} · {movie?.release_date?.split("-")[0]} ·
              {movie?.runtime} min
            </Text>
            <View style={tw`flex-row justify-center gap-x-2`}>
              {movie?.genres?.map((genre, index) => {
                return (
                  <Text
                    style={tw`text-gray-400 font-semibold text-base text-center mt-2`}
                    key={index}>
                    {genre?.name} ·
                  </Text>
                );
              })}
            </View>
            <Text style={tw`text-gray-400 mx-4 mt-3`}>{movie?.overview}</Text>
          </View>
        </SafeAreaView>
      </View>
      <Cast navigation={navigation} cast={cast}></Cast>
      <MovieList
        title="Similar Movies"
        data={similar}
        hideSeeAll={true}></MovieList>
    </ScrollView>
  );
};

export default MovieScreen;
