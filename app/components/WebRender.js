/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  WebView,
  Dimensions,
  Linking,
} from 'react-native';


export default class WebRender extends Component {

  constructor(props) {
    super(props);
    const { width } = Dimensions.get('window');
    this.maxWidth = width - 20;
    this.state = {
      height: 0,
    };
  }

  onNavigationStateChange(event) {
    this.setState({
      height: Number(event.title),
    });
    if (event.url.substring(0, 4) !== 'data') {
      this.webview.stopLoading();
      Linking.openURL(event.url);
    }
  }

  getCalculatedHeight(imgWidth, imgHeight, maxWidth) {
    return (imgHeight / imgWidth) * maxWidth;
  }

  render() {
    const { content } = this.props;
    const css = 'https://static.techinasia.com/assets/e89c3101c60a7ddbd0e09b12bdb41273/app.b216ce401b2755f41b4fecd81a7b106d.css';
    const script = `
      var body = document.body;
      var html = document.documentElement;
      document.title = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      function resizeAttr(type) {
        var content = document.getElementsByTagName(type);
        for(var i=0; i < content.length; i++) {
          var width = content[i].width || 0;
          var height = content[i].height || 0;
          if(width > ${this.maxWidth}) {
            content[i].width = ${this.maxWidth};
            content[i].height = (height / width) * ${this.maxWidth};
          }
        }
      }
      resizeAttr('iframe');
      resizeAttr('img');
    `;
    return (
      <View style={[styles.container, { height: this.state.height }]} >
        <WebView
          ref={(ref) => { this.webview = ref; }}
          source={{ html: ` <head><link rel="stylesheet" type="text/css" href="${css}"><style media="screen">body{padding-top: 0!important} body > div {margin: 0; padding: 0;} body > * {padding: 10px;}</style></head> ${content} <script type="text/javascript"> ${script} </script>` }}
          onNavigationStateChange={event => this.onNavigationStateChange(event)}
          javaScriptEnabled
          startInLoadingState
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});
