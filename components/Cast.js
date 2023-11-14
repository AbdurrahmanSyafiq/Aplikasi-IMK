import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { fallbackPersonImage, image185 } from "../Api/Database";
const Cast = ({ cast, navigation }) => {
  let personName = "Donny Yen";
  let characterName = "Ip Man";
  return (
    <View style={tw`my-6`}>
      <Text style={tw`text-white text-lg mx-4 mb-5 `}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={tw`mr-4 items-center`}
                onPress={() => navigation.navigate("Person", person)}>
                <View
                  style={tw`overflow-hidden rounded-full h-20 w-20 items-center`}>
                  <Image
                    // source={require("../assets/images/castImage1.png")}
                    source={{
                      uri: image185(
                        person?.profile_path || fallbackPersonImage,
                      ),
                    }}
                    style={tw`rounded-full h-24 w-20`}></Image>
                </View>
                <Text style={tw`text-white text-xs ml-1`}>
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text style={tw`text-white text-xs ml-1`}>
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
