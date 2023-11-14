import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../Api/Database";
var { width, height } = Dimensions.get("window");

const MovieCard = ({ item, handleClick }) => {
  const navi = useNavigation();
  console.log("item.poster_path :", item.poster_path);
  return (
    <TouchableWithoutFeedback onPress={() => navi.navigate("Movie", item)}>
      <Image
        // source={require("../assets/images/moviePoster1.png")}
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.5,
          height: height * 0.4,
          borderRadius: 20,
        }}></Image>
    </TouchableWithoutFeedback>
  );
};
export default function TrendingList({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View style={tw`mb-8`}>
      <Text style={tw`text-white text-xl mb-5 mt-12 mx-4`}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            handleClick={(item) => handleClick(item)}></MovieCard>
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.52}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
