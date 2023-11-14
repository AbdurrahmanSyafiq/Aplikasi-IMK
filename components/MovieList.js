import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185, image342 } from "../Api/Database";
var { width, height } = Dimensions.get("window");
const MovieList = ({ title, data, hideSeeAll }) => {
  let Nama = "Ant-Man and the Wasp: Quantumania";
  const navigation = useNavigation();
  return (
    <View style={tw`mb-8 gap-y-4`}>
      <View style={tw`mx-4 flex-row justify-between items-center`}>
        <Text style={tw`text-white text-xl `}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={tw`text-blue-700 text-lg`}> See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}>
              <View style={tw`gap-y-1 mr-4`}>
                <Image
                  // source={require("../assets/images/moviePoster1.png")}
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  style={{ width: width * 0.3, height: height * 0.2 }}></Image>
                <Text style={tw`text-white font-semibold`}>
                  {/* {item && item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title} */}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
