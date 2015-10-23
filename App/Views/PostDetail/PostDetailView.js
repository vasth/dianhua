'use strict';
var React = require('react-native');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  } = React;

var CommentList = require('./CommentList');

var PostDetailView = React.createClass({
  getInitialState: function() {
    return {
      loading: true
    };
  },

  componentDidMount: function() {
    fetch('http://zhuanlan.zhihu.com/api/columns/pinapps/posts/' + this.props.slug)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          resData: responseData,
          loading: false
        });
      })
      .done();
  },

  render: function() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text style={{marginTop: 100}}>
            加载知乎中...
          </Text>
        </View>
      );
    }

    var data = this.state.resData;
    return (
      <ScrollView style={styles.container}>
        <Image
          source={{uri: data.titleImage}}
          style={styles.titleImage}
        />

        <View style={styles.contentWrap}>
          <Text style={styles.title}>{data.title}</Text>

          <View style={styles.authorInfo}>
            <Image
              source={{uri: data.author.avatar.template.replace('\{id\}', data.author.avatar.id).replace('{size}', 'xs')}}
              style={styles.avatar}
            />
            <Text style={styles.author}> {data.author.name} · {data.publishedTime} </Text>
          </View>

          <Text style={styles.content}>{data.content}</Text>
        </View>

        <CommentList postid={this.props.slug}/>
      </ScrollView>

    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  titleImage: {
    height: 178,
  },
  contentWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
  },

  authorInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 12.5,
    width: 25,
    height: 25,
  },
  author: {
    lineHeight: 20,
    marginLeft: 5,
  },

  content: {
    fontSize: 16,
    marginTop: 15,
  }

});

module.exports = PostDetailView;