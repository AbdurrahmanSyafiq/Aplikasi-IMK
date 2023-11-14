import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TrendingList from "../components/TrendingList";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../Api/Database";
const ios = Platform.OS == "ios";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [trending, setTrending] = useState([1, 2, 3, 4, 5]);
  const [upComing, setUpComing] = useState([1, 2, 3, 4, 5]);
  const [topRated, setTopRated] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);
  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log("got trending movies :", data);
    if (data && data.results) setTrending(data.results);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log("got trending movies :", data);
    if (data && data.results) setUpComing(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log("got trending movies :", data);
    if (data && data.results) setTopRated(data.results);
  };
  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-2 mt-2`}>
        <StatusBar style="light"></StatusBar>
        <View style={tw`flex-row justify-between items-center mx-4`}>
          <Bars3CenterLeftIcon
            size={30}
            strokeWidth={2}
            color="white"></Bars3CenterLeftIcon>
          <Text style={tw`text-white font-bold text-2xl`}>
            Liga<Text style={tw`text-blue-700`}>Film</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} color="white"></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsHorizontalScrollIndicator={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}>
        {trending.length > 0 && <TrendingList data={trending}></TrendingList>}
        <MovieList title="Upcoming" data={upComing}></MovieList>
        <MovieList title="Top Rated" data={topRated}></MovieList>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
