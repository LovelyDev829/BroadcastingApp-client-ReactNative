import 'react-native-gesture-handler';
import React from 'react';
import { Alert, Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './components/WelcomeScreen';
import PlayerScreen from './components/PlayerScreen';
import AuthorListScreen from './components/AuthorListScreen';
import TestScreen from './components/TestScreen';
// import SwipeScreen from './components/SwipeScreen';

const Stack = createStackNavigator();
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './components/Reducer';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen  options={{ headerShown: false }}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen  options={{ headerShown: false }}
            name="AuthorList"
            component={AuthorListScreen}
          />
          <Stack.Screen  options={{ headerShown: false }}
            name="Player"
            component={PlayerScreen}
          />
          <Stack.Screen  options={{ headerShown: false }}
            name="Test"
            component={TestScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#00000040"
  }
});

export default App;