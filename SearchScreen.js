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
    TextInput,
    ScrollView,
} = React;


var BASE_URL = 'http://news.at.zhihu.com/api/4/news/';
var REF_HEADER = 'header';
var PIXELRATIO = PixelRatio.get();
var HEADER_SIZE = 200;

var SearchScreen = React.createClass({
  getInitialState: function() {
    return {
      splashed: false,
      searchtext:"",
    };
  },
  render: function() {

   // var toolbar = <DetailToolbar navigator={this.props.navigator} style={styles.toolbar}
   //   story={this.props.story}/>;
      return (
          <View style={styles.container}>
            <View style={styles.searchbar}>
              <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1,flex: 1}}
                  onChangeText={(text) => this.setState({searchtext:text})}
                  value={this.state.searchtext}
                  autoFocus={true}
                  placeholder="请输入搜索内容"
                  />
              <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.scrollist}>
                <View style={styles.searchbar1}>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
                </View>
              </View>
            </ScrollView>
          </View>
      );
  }
});

var THUMBS = [
  {item1: "美甲", "item2": "SPA"},
  {item1: "美容", "item2": "按摩"},
  {item1: "桑拿", "item2": "洗浴"},
  {item1: "保养", "item2": "微整形"},
  {item1: "宠物医院", "item2": "狗粮"},
  {item1: "工商注册", "item2": "商标"},
  {item1: "专利", "item2": "版权"},
  {item1: "设计", "item2": "汽车美容"},
  {item1: "上门服务", "item2": "商标国际"},
];


// {toolbar}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer:{
    paddingVertical: 20
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  img: {
    width: 64,
    height: 64,
  },
  title:{
    backgroundColor: '#fff',
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchbar:{
    marginTop:10,
    height: 56,
    flexDirection: 'row',
  },
  searchbar1:{
    marginTop:10,
    height: 156,
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  searchbox:{
    height: 56,
    flex: 1,
  },
  searchbtn:{
    height: 36,
    width:80,
    marginBottom: 20,
    marginRight:10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00a2ed',
    borderRadius: 3,
  },
  scrollist:{
    marginTop:20,
  },
});

module.exports = SearchScreen;
