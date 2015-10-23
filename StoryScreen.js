'use strict';

var React = require('react-native');
var {
  AppRegistry,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Image,
  ToolbarAndroid,
  TouchableHighlight,
  Animated,
  Platform,
  WebView,
} = React;

var MyWebView = (Platform.OS === 'ios') ? WebView : require('./WebView');
var DetailToolbar = require('./DetailToolbar');

var BASE_URL = 'http://news.at.zhihu.com/api/4/news/';
var REF_HEADER = 'header';
var PIXELRATIO = PixelRatio.get();
var HEADER_SIZE = 200;

var StoryScreen = React.createClass({

  render: function() {

   // var toolbar = <DetailToolbar navigator={this.props.navigator} style={styles.toolbar}
   //   story={this.props.story}/>;
      return (
        <View style={[styles.container, styles.center]}>
          <Text>
            正在加载...
          </Text>

        </View>
      );
  }
});
// {toolbar}
var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#000',
    height: 56,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  header: {
    height: HEADER_SIZE,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 56,
  },
  headerImage: {
    height: HEADER_SIZE,
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top:56,
  },
});

module.exports = StoryScreen;
