import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import PlayerScreen from './PlayerScreen';
import AuthorListScreen from './AuthorListScreen';
export default class TestScreen extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              screen: {PlayerScreen},
          },
          {
              screen: {AuthorListScreen},
          }
        ]
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'white',
              height: "100%",
              width: "100%",
               }}>
            <PlayerScreen/>
          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'black', paddingTop: 0, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={'default'}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={10}
                  itemWidth={500}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}