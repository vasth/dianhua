'use strict';
var React = require('react-native');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  } = React;

var CommentList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isLoading: true
    }
  },

  componentDidMount: function () {
    fetch('http://zhuanlan.zhihu.com/api/columns/pinapps/posts/'+ this.props.postid +'/comments?limit=20')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          replyCount: responseData.length,
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          isLoading: false
        });
      })
      .done()
  },

  render: function() {
    console.log(this.state.replyCount);
    return (
      <ListView
        style={styles.commentList}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
        pageSize={10}
      />
    )
  },

  renderRow: function(comment) {
    return (
      <View style={styles.comment}>
        <Image
          source={{uri: comment.author.avatar.template.replace('\{id\}', comment.author.avatar.id).replace('{size}', 'l')}}
          style={styles.avatar}
        />

        <View style={styles.commentUser}>
          <Text style={styles.commentUserName}>{comment.author.name}</Text>
          <Text>{comment.content}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.createTime}> {comment.createdTime}  </Text>
            <TouchableHighlight onPress={() => this.addFav(comment.id)}>
              <Text>赞</Text>
            </TouchableHighlight>
          </View>

        </View>
      </View>
    )
  },

  renderHeader: function() {
    return (
      <Text >{this.state.replyCount}条评论</Text>
    )
  },

  addFav: function (commentId) {
    alert(commentId);
  },
});

var styles = StyleSheet.create({
  commentList: {
    marginTop: 0,
    paddingTop: 0,
    padding: 10,
  },

  comment: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  commentUser: {
    flexDirection: 'column',
    paddingLeft: 5,
  },
  createTime: {
    color: '#9d9e9f',
  },
  commentUserName: {
    color: '#225d99',
  }

});

module.exports = CommentList;