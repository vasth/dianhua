'use strict';
var React = require('react-native');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  } = React;

var PostCellView = React.createClass({
  getInitialState: function() {
    return {
      post: this.props.post
    };
  },

  render: function() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Image
            source={{uri: this.state.post.titleImage}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{this.state.post.title}</Text>
            <Text style={styles.time}>{this.state.post.publishedTime}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },

  thumbnail: {
    flex: 1,
    height: 200,
  },

  rightContainer: {
    flex: 1,
    padding: 5,
    marginBottom: 15,
  },

  title: {
    fontSize: 16,
    marginBottom: 3,
    textAlign: 'left',
  },

  time: {
    fontSize: 12,
    color: '#999999',
  },

})

module.exports = PostCellView;