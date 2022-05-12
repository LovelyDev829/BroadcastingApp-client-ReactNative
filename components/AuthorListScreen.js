import "react-native-gesture-handler";
import React from "react";
import {
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Grid from "react-native-grid-component";
const Stack = createStackNavigator();
// const image = { uri: "https://reactjs.org/logo-og.png" };
const image = require("../resource/image/background_ammar/001.png");
const starImage = require("../resource/image/background_ammar/star_R.png");
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { setModeAndAuthorById } from "./Actions";
import { useSelector, useDispatch } from "react-redux";

const AuthorListScreen = (props) => {
  const resourceUrL = useSelector((state) => state.basic[0]?.resourceUrl);
  const modeList = useSelector((state) => state.modeList);
  const dispatch = useDispatch();
  const setModeAndAuthorByID = (modeId, authorId) => {
    dispatch(setModeAndAuthorById(modeId, authorId));
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.topTitle}>قائمة المقاطع</Text>
        <ScrollView style={styles.row}>
          {modeList?.map((modeItem) => {
            return (
              <View style={styles.modeBox} key={"modeItem_" + modeItem._id}>
                <View style={styles.modeTitleView}>
                  <Text style={styles.modeTitle}>{modeItem.modeName}</Text>
                </View>
                <View>
                  {modeItem.authorList.map((authorItem) => {
                    return (
                      <View
                        key={"authorItem_" + modeItem._id + authorItem.author._id}
                        style={styles.authorBox}
                        onTouchEnd={() => {
                          props.navigation.navigate("Player");
                          setModeAndAuthorByID(modeItem._id, authorItem.author._id);
                        }}
                      >
                        <Image
                          source={{uri: resourceUrL+authorItem.author.authorPhotoUrl}}
                          style={styles.face}
                        />
                        <Text style={styles.authorName}>
                          {authorItem.author.authorName}
                        </Text>
                        <Image source={starImage} style={styles.starImage} />
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  topTitle: {
    color: "#ffffff90",
    fontSize: 35,
    lineHeight: 60,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  image: {
    flex: 1,
    height: windowHeight,
  },
  row: {
    padding: 0,
    margin: 0,
    height: 300,
    flexGrow: 0,
    height: windowHeight,
  },
  modeBox: {},
  modeTitleView: {
    borderTopWidth: 1,
    borderColor: "#ffffff40",
    backgroundColor: "#00000090",
    padding: 10,
    flexDirection: "row",
  },
  modeTitle: {
    color: "white",
    fontSize: 30,
  },
  authorBox: {
    borderTopWidth: 1,
    borderColor: "#ffffff40",
    backgroundColor: "#00000070",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  face: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  authorName: {
    color: "#ffffffff",
    fontSize: 25,
    textAlign: "left",
    marginLeft: 10,
  },
  starImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    margin: 5,
  },
});

export default AuthorListScreen;
