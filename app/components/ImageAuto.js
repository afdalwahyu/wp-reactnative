import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Pie';

class ImageAuto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
      imageWidth: 750,
      imageHeight: 418,
    };
  }

  getCalculatedHeight() {
    return (this.state.imageHeight / this.state.imageWidth) * this.state.width;
  }

  calculateWH(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({
      width,
    });
  }

  render() {
    return (
      <View
        style={{ flex: 1 }}
        onLayout={event => this.calculateWH(event)}
      >
        <Image
          style={[{ width: this.state.width, height: this.getCalculatedHeight() }]}
          source={{ uri: this.props.source }}
          resizeMethod={'resize'}
          indicator={Progress}
          indicatorProps={{
            size: 80,
            borderWidth: 0,
            color: 'rgba(150, 150, 150, 1)',
            unfilledColor: 'rgba(200, 200, 200, 0.2)',
          }}
        />
      </View>
    );
  }
}

export default ImageAuto;
