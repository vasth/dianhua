'use strict';

var React = require('react-native');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  } = React;

var REQUEST_URL = 'http://zhuanlan.zhihu.com/api/columns/pinapps/posts?limit=10&offset=';


var PostCellView = require('./PostCellView');
var PostDetailView = require('../PostDetail/PostDetailView');

var Posts = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      responseData: [],
      loaded: false,
      pageOffset: 0,
      loading: false,
    };
  },

  /**
   * component 渲染后加载数据
   */
  componentDidMount: function () {
    this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
  },


  /**
   * 加载数据
   * @param url
   */
  fetchData: function (url) {
    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(responseData) {
        var data = this.state.responseData.concat(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          loaded: true,
          responseData: data,
          pageOffset: ++this.state.pageOffset,
          loading: false,
        });
      }.bind(this))
      .done();
  },

  /**
   * 渲染方法
   * @returns {XML}
   */
  render: function () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        pageSize={10}
        renderRow={this.renderList}
        style={styles.listView}
        renderFooter={this.renderFooter}
      />
    );
  },

  /**
   * 页面进来的时候加载 loading
   * @returns {XML}
   */
  renderLoadingView: function () {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          加载知乎中...
        </Text>
      </View>
    );
  },

  /**
   * 滚动到底部的时候加载更多
   */
  endReached: function () {
    this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
  },

  /**
   * 加载更多
   */
  loadMore: function () {
    this.setState({
      loading: true
    });
    this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
  },

  /**
   * 底部视图
   * @returns {XML}
   */
  renderFooter: function () {
    return (
      <TouchableHighlight
        onPress={this.loadMore}
        underlayColor='#FFFFFF'>
        <View style={styles.containerFooter}>
              {this.state.loading ?
                <Image
                  source={{uri: 'http://s6.mogucdn.com/pic/140813/kuw9n_ieyggojrmi4dknlbmiytambqgiyde_26x26.gif'}}
                  style={{width: 26, height: 26, flex: 1, marginLeft: -80}}
                />
                :
                <Text style={styles.loadeMoreBtn}>
                  点击加载更多...
                </Text>
                }
        </View>
      </TouchableHighlight>
    )

  },

  /**
   * 开始加载列表
   * @param post
   * @returns {XML}
   */
  renderList: function (post) {
    return (
      <PostCellView
        onSelect={ () => this.renderDetail(post)}
        post={post}
      />
    );
  },

  /**
   * 点击跳转到 post 详情页
   * @param post
   */
  renderDetail: function(post){
    this.props.navigator.push({
      title: post.title,
      component: PostDetailView,
      passProps: {slug: post.slug}
    })
  }
});

var styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  listView: {
    paddingBottom: 20,
  },

  loadingText: {
    marginTop: 100,
    textAlign: 'center',
    flex: 1,
  },

  containerFooter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },

  loadeMoreBtn: {
    textAlign: 'center',
    flex: 1,
    color: '#f34943',
    fontSize: 14,
    marginTop: 5,
  },
});

module.exports = Posts;
