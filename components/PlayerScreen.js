import React, { useState, useEffect } from "react";
import {
  BackHandler,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import Sound from "react-native-sound";
import Svg, { Circle } from "react-native-svg";
import SystemSetting from "react-native-system-setting";
import axios from "axios";
import { setModeAndAuthorByPosition } from "./Actions";
import "react-native-gesture-handler";

const Stack = createStackNavigator();
const image = require("../resource/image/background_ammar/001.png");
const logoTop = require("../resource/image/background_ammar/logoTop.png");
const logoMiddle = require("../resource/image/background_ammar/logoMiddle.png");
const logoBottom = require("../resource/image/background_ammar/logoBottom.png");
const playIcon = require("../resource/image/icons/type_2/play_R.png");
const pauseIcon = require("../resource/image/icons/type_2/pause_R.png");
const recordReadyIcon = require("../resource/image/icons/type_2/record_R_ready.png");
const recordClickedIcon = require("../resource/image/icons/type_2/record_R_clicked.png");
const beforeIcon = require("../resource/image/icons/type_2/before_R.png");
const nextIcon = require("../resource/image/icons/type_2/next_R.png");
const leftIcon = require("../resource/image/icons/type_2/left_R.png");
const rightIcon = require("../resource/image/icons/type_2/right_R.png");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
var interval;

const PlayerScreen = (props) => {
  // console.log("(Note)-------------playerScreen updated");
  const modeLisT = useSelector((state) => state.modeList);
  const basicLisT = useSelector((state) => state.basic[0]);
  const resourceUrL = basicLisT.resourceUrl;
  const broadcastingUrL = basicLisT.broadcastingUrl;
  const modeCounT =basicLisT.modeCount;
///////////////////////////////////////////////////////////////////////////////////
  const currentModeID = basicLisT.currentModeId;
  // const currentAuthorID = basicLisT.currentAuthorId;
  const currentAuthorID = useSelector((state)=>state.basic[0].currentAuthorId);
  const currentModePositioN = basicLisT.currentModePosition
  const authorCounT = modeLisT[currentModePositioN-1].authorCount
  const currentAuthorPositioN = basicLisT.currentAuthorPosition
  const authorNamE = modeLisT[currentModePositioN-1].authorList[currentAuthorPositioN-1].author.authorName;
////////////////////////////////////////////////////////////////////////////////////
  const [playFlag, setPlayFlag] = useState(true);
  const [recordFlag, setRecordFlag] = useState(false);
  const [songFlag, setSongFlag] = useState(false);
  const [timestamp, setTimestamp] = useState(0);
  const [soundSource, setSoundSource] = useState();

  
  BackHandler.addEventListener("hardwareBackPress", function () {
    clearInterval(interval);
    soundSource?.stop();
    setPlayFlag(false);
  });
  const [touchPosition, setTouchPosition] = useState({
    locationX: 0,
    locationY: 0,
    distanceX: 0,
    distanceY: 0,
    distance: 0,
    angle: 120,
    radian: 0,
  });
  function getAudioSource(musicData) {
    soundSource?.pause();
    var soundPlayer = new Sound(
      resourceUrL + musicData.songUrl,
      // "http://10.0.2.2/resource/sound/001.mp3",
      // "https://listen.radioking.com/radio/487685/stream/544427",
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("(Note)-------------Failed to load the sound.", error);
          return;
        } else {
          soundPlayer.play();
          var delay=Date.now()/1000-timestamp;
          console.log("Point A : "+timestamp);
          console.log("Point B : "+Date.now()/1000);
          console.log("Delay   : "+delay);
          console.log("------------------------delay:"+delay);
          soundPlayer.setCurrentTime(musicData.startTime);
          console.log("(Note)-------------Sound loaded to the app successfully.");
          setSoundSource(soundPlayer);
          setSongFlag(true);
        }
      }
    );
  }
  function getNewAudio(_currentAuthorID) {
    setTimestamp(Date.now()/1000);
    console.log("Point A : "+timestamp);
    axios
      .get(`${broadcastingUrL}/stream/${_currentAuthorID}`)
      .then((res) => {
        console.log("(Note)-------------Song data loaded from the database successfully.");
        console.log(res.data.songUrl + "-----" + res.data.songTime + "-----" + res.data.startTime);
        getAudioSource(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const dispatch = useDispatch();
  function setModeAndAuthorByPositioN(modePosition, authorPosition){
    dispatch(setModeAndAuthorByPosition(modePosition, authorPosition))
  }
  async function nextButton() {
    if(!songFlag) return;
    setSongFlag(false)
    var modeTemp=currentModePositioN;
    var authorTemp=currentAuthorPositioN;
    if(authorCounT<=authorTemp){
      if(modeCounT<=modeTemp)  setModeAndAuthorByPositioN(1, 1)
      else   setModeAndAuthorByPositioN(modeTemp+1, 1)
    }
    else  setModeAndAuthorByPositioN(modeTemp, authorTemp+1)
  }
  function prevButton() {
    if(!songFlag) return;
    setSongFlag(false)
    var modeTemp=currentModePositioN;
    var authorTemp=currentAuthorPositioN;
    if(authorTemp==1){
      if(modeTemp==1) setModeAndAuthorByPositioN(modeCounT, modeLisT[modeCounT-1].authorCount)
      else setModeAndAuthorByPositioN(modeTemp-1, modeLisT[modeTemp-2].authorCount)
    }
    else setModeAndAuthorByPositioN(modeTemp, authorTemp-1)
  }
  useEffect(()=>{
    console.log("currentAuthorID was changed to..."+currentAuthorID)
    getNewAudio(currentAuthorID);
  },[currentAuthorID])

  function everySecCall(){
    console.log("playFlag : "+playFlag);
  }
  useEffect(()=>{
    interval = setInterval(() => {everySecCall()}, 1000)
  },[])

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resgizeMode="cover" style={styles.image}>
        <View style={styles.logos}>
          <Image style={styles.logoSmall} source={logoMiddle} />
          <Image style={styles.logoBig} source={logoTop} />
          <Image style={styles.logoSmall} source={logoBottom} />
        </View>
        <View style={styles.authorView}>
          <Image
            style={styles.playerBigBtn}
            source={leftIcon}
            onTouchEnd={() => {
              prevButton();
            }}
          />
          <Text style={styles.authorName}>{authorNamE}</Text>
          <Image
            style={styles.playerBigBtn}
            source={rightIcon}
            onTouchEnd={() => {
              nextButton();
            }}
          />
        </View>
        <Svg
          height={windowWidth - 50}
          width={windowWidth}
          style={styles.volumeControl}
          onTouchMove={(event) => {
            var locationX = event.nativeEvent.locationX.toFixed(2);
            var locationY = event.nativeEvent.locationY.toFixed(2);
            var distanceX = (windowWidth / 2 - locationX).toFixed(2);
            var distanceY = (windowWidth / 2 - locationY).toFixed(2);
            var distance = Math.sqrt(
              distanceX * distanceX + distanceY * distanceY
            );
            var radian = Math.atan(distanceY / distanceX);
            var angleTemp =
              distanceX > 0
                ? ((radian * 180) / 3.14).toFixed(2)
                : ((radian * 180) / 3.14 + 180).toFixed(2);
            var angle =
              angleTemp < -60 ? -60 : angleTemp > 240 ? 240 : angleTemp;
            if (distance < 180) {
              setTouchPosition({
                locationX: locationX,
                locationY: locationY,
                distanceX: distanceX,
                distanceY: distanceY,
                distance: distance,
                radian: radian,
                angle: angle,
              });
              SystemSetting.setVolume((angle / 3.0 + 20) / 100);
            }
          }}
        >
          <Circle
            cx={windowWidth / 2}
            cy={windowWidth / 2}
            r="165"
            fill="#00000030"
          />
          <Circle
            cx={windowWidth / 2}
            cy={windowWidth / 2}
            r="150"
            fill="#f0f0f0d0"
            style={styles.volumeInnerCircle}
          />
          <Circle
            cx={windowWidth / 2}
            cy={windowWidth / 2}
            r="140"
            fill="white"
            style={styles.volumeInnerCircle}
          />
          <Circle
            cx="110"
            cy={windowWidth / 2}
            r="12"
            fill="#000000a0"
            rotation={touchPosition.angle}
            origin={(windowWidth / 2, windowWidth / 2)}
          />
        </Svg>
        <Text style={styles.volumeTextTop} pointerEvents={"none"}>
          {recordFlag ? "تسجيل" : playFlag ? "تشغيل" : "إيقاف"}
        </Text>
        <Text style={styles.volumeText} pointerEvents={"none"}>
          {(touchPosition.angle / 3.0 + 20).toFixed(0)}/100
        </Text>
        <Text style={styles.volumeTextDown} pointerEvents={"none"}>
          الصوت
        </Text>
        {/* <Image style={styles.gifImg} source={playFlag ? gifImg : gifImgStop} /> */}
        <View style={styles.songView}>
          <Text style={styles.songTitle}>العنوان</Text>
        </View>
        <View style={styles.playerBtns}>
          <Image
            style={styles.playerSmallBtn}
            source={beforeIcon}
            onTouchEnd={() => {
              prevButton();
            }}
          />
          <View style={styles.playerBtnsCenter}>
            <Image
              style={recordFlag ? styles.hidden : styles.playerBigBtn}
              source={recordReadyIcon}
              onTouchEnd={() => {
                setRecordFlag(playFlag ? true : false);
              }}
            />
            <Image
              style={recordFlag ? styles.playerBigBtn : styles.hidden}
              source={recordClickedIcon}
              onTouchEnd={() => {
                setRecordFlag(false);
              }}
            />
            <Image
              style={playFlag ? styles.hidden : styles.playerBigBtn}
              source={playIcon}
              onTouchEnd={() => {
                soundSource?.setVolume(0.6);
                setPlayFlag(true);
              }}
            />
            <Image
              style={playFlag ? styles.playerBigBtn : styles.hidden}
              source={pauseIcon}
              onTouchEnd={() => {
                setPlayFlag(false);
                soundSource?.setVolume(0);
                setRecordFlag(false);
              }}
            />
          </View>
          <Image
            style={styles.playerSmallBtn}
            source={nextIcon}
            onTouchEnd={() => {
              nextButton();
            }}
          />
        </View>
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
  image: {
    flex: 1,
    height: windowHeight,
  },
  authorView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  authorName: {
    fontSize: 40,
    color: "white",
  },
  logos: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "#0000f080",
  },
  logoBig: {
    width: 80,
    height: 140,
    resizeMode: "contain",
    margin: 13,
  },
  logoSmall: {
    width: 140,
    height: 60,
    resizeMode: "contain",
    margin: 13,
  },
  gifImg: {
    width: "100%",
    height: 500,
    opacity: 0.5,
  },
  songView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 40,
  },
  songTitle: {
    fontSize: 30,
    color: "white",
  },
  playerBtns: {
    width: "100%",
    // backgroundColor: "#0000f080",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  playerBtnsCenter: {
    flexDirection: "row",
  },
  playerBigBtn: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    margin: 13,
  },
  playerSmallBtn: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    margin: 15,
  },
  hidden: {
    display: "none",
  },
  volumeControl: {
    zIndex: 1,
  },
  volumeTextTop: {
    position: "absolute",
    top: 410,
    fontSize: 35,
    color: "grey",
    zIndex: 4,
    marginLeft: "32%",
    textAlign: "center",
    // backgroundColor: "black",
    borderRadius: 70,
  },
  volumeText: {
    position: "absolute",
    top: 465,
    fontSize: 20,
    color: "grey",
    zIndex: 1,
    marginLeft: "33%",
    textAlign: "center",
  },
  volumeTextDown: {
    position: "absolute",
    top: 495,
    fontSize: 23,
    color: "grey",
    zIndex: 4,
    marginLeft: "34%",
    textAlign: "center",
  },
});

export default PlayerScreen;
