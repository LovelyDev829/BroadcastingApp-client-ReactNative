import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const Stack = createStackNavigator();
// const image = { uri: "https://reactjs.org/logo-og.png" };
const image = require("../resource/image/background_ammar/001.png");
const logoMain = require("../resource/image/background_ammar/logo_002.png");
import { firstLoad } from "./Actions";

const WelcomeScreen  = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('http://10.0.2.2:8290/liveRadio/all_structure')
      .then(res => {
        // console.log(res.data)
        console.log("(Note)-------------Database loaded successfully.")
        dispatch(firstLoad(res.data));
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  return(
  <View style={styles.container} onTouchStart={() => props.navigation.navigate('AuthorList')}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Image source={logoMain} style={styles.middleLogo}>
      </Image>
    </ImageBackground>
  </View>
);}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  middleLogo:{
    width: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  }
});

export default WelcomeScreen ;