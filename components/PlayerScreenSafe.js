import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  BackHandler,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import Grid from "react-native-grid-component";
import { nextSong } from "./Actions";
import { useSelector, useDispatch } from "react-redux";
import Sound from "react-native-sound";
import Svg, { Circle } from "react-native-svg";
import SystemSetting from "react-native-system-setting";
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
var moment = require('moment-timezone');
var localTime, worldTime, nowHours, nowMinutes, nowSeconds, passedSeconds;

import { nextAuthor, prevAuthor } from "./Actions";
import axios from 'axios';


const PlayerScreen = (props) => {
  console.log("(Note)-------------playerScreen updated");
  const domaiN = useSelector((state) => state.broadcastingDomain);
  const [modeCounT, setModeCounT]= useState(useSelector((state) => state.modeCount));
  const [modeLisT, setModeLisT]= useState(useSelector((state) => state.modeList));
  const [currentModeId, setCurrentModeId]= useState(useSelector((state) => state.currentMode))
  const [authorCounT, setAuthorCounT]= useState(modeLisT[currentModeId - 1].authorCount)
  const [authorLisT, setAuthorLisT]= useState(modeLisT[currentModeId - 1].authorList)
  const [currentAuthorId, setCurrentAuthorId]= useState(useSelector((state) => state.currentAuthor))

  const [playList, setPlayList]= useState(authorLisT[currentAuthorId - 1].songList)
  // var playList = authorLisT[currentAuthorId-1].songList;
  const [authorNamE, setAuthorNamE]= useState(authorLisT[currentAuthorId - 1].authorName)
  const [songCounT, setSongCounT]= useState(authorLisT[currentAuthorId - 1].songCount)
  const [soundSource, setSoundSource] = useState();
  const [playFlag, setPlayFlag] = useState(true);
  const [recordFlag, setRecordFlag] = useState(false);
  function getAudio(id) {
    console.log("getAudio_Function_Runs.")
    var soundPlayer = new Sound(
      domaiN+playList[id-1].songUrl,
      // "https://listen.radioking.com/radio/487685/stream/544427",
      // "https://http://10.0.2.2:8080/stream"
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("(Note)-------------Failed to load the sound.", error);
          return;
        }
        // soundPlayer.play();
        // console.log("(Note)-------------Sound loaded successfully.");
        // setSoundSource(soundPlayer)
        /////////////////////////////////////////////////////
        var songDuration = soundPlayer.getDuration();
        console.log("passedSeconds : "+passedSeconds);
        console.log("songDuration : "+songDuration);
        if(songDuration<passedSeconds){
          passedSeconds-=songDuration;
          id++;
          if(songCounT<id) id=1;
          getAudio(id)
        }
        else{
          soundPlayer.play();
          soundPlayer.setCurrentTime(passedSeconds)
          console.log("(Note)-------------Sound loaded successfully.");
          setSoundSource(soundPlayer)
          // return soundPlayer;
          // .then(console.log("did"));
          console.log("soundPlayer"+soundPlayer+"soundPlayer");
          console.log("soundSource"+soundSource+"soundSource");
        }
      }
    );
  }
  const dispatch = useDispatch();
  function nextButton() {
    soundSource?.stop();
    // if(authorCounT<=currentAuthorId){
    //   if(modeCounT<=currentModeId)   setCurrentModeId(1)
    //   else            setCurrentModeId(currentModeId+1)
    //   setCurrentAuthorId(1);
    //   setAuthorCounT(modeLisT[currentModeId - 1].authorCount)
    //   setAuthorLisT(modeLisT[currentModeId - 1].authorList)
    // }
    // else   setCurrentAuthorId(currentAuthorId+1)
    // setPlayList(authorLisT[currentAuthorId - 1].songList)
    // setAuthorNamE(authorLisT[currentAuthorId - 1].authorName)
    // setSongCounT(authorLisT[currentAuthorId - 1].songCount)
    // var newSoundPlayer = new Sound(
    //   playList[0].songUrl,
    //   Sound.MAIN_BUNDLE,
    //   (error) => {
    //     if (error) {
    //       console.log("(Note)-------------Failed to load the next sound.", error);
    //       return;
    //     }
    //     console.log("(Notadb disconnect 127.0.0.1:21503
    //     setSoundSource(newSoundPlayer);
    //     soundSource.play();
    //   }
    // )
  }
  // function prevButton() {
  //   soundSource.stop();
  //   // dispatch(prevAuthor());
  //   // setSoundSource(getAudio);
  //   newAuthorStart();
  //   getAudio(1);
  // }
  BackHandler.addEventListener("hardwareBackPress", function () {
    soundSource?.stop();
    // soundSource?.setVolume(0);
    // SystemSetting.setVolume(0)
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
  function newAuthorStart(){
    localTime = new Date();
    console.log("LocalTime : "+localTime);
    worldTime = moment().tz("America/Los_Angeles");
    console.log("WorldTime : "+worldTime.format());
    nowHours = moment(worldTime).hours();
    nowMinutes = moment(worldTime).minutes();
    nowSeconds = moment(worldTime).seconds();
    console.log("nowHours : "+nowHours);
    console.log("nowMinutes : "+nowMinutes);
    console.log("nowSeconds : "+nowSeconds);
    passedSeconds=nowHours*360+nowMinutes*60+nowSeconds;
    console.log("passedSeconds : "+passedSeconds);
  }
  useEffect(()=>{
    newAuthorStart();
    // setSoundSource(getAudio(1));
    // getAudio(1);
    axios.get(`http://10.0.2.2:8290/liveRadio/stream/${currentModeId}/${currentAuthorId}`)
      .then(res => {
        // console.log(res.data[0])
        console.log("(Note)-------------Song database loaded successfully.")
        // dispatch(firstLoad(res.data[0]));
        // console.log("modeId   : "+res.data.modeId);
        // console.log("authorId   : "+res.data.authorId);
        console.log("data   : "+res.data);
      })
      .catch((error) => {
        console.log(error);
      })
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
                // soundSource.play();
                soundSource?.setVolume(0.6);
                setPlayFlag(true);
              }}
            />
            <Image
              style={playFlag ? styles.playerBigBtn : styles.hidden}
              source={pauseIcon}
              onTouchEnd={() => {
                // soundSource.pause();
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
