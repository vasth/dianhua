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
var API_KEY = 'AIzaSyCBWSkIpo37W3jsJD2g7NY8sSSzKZXo6iw';

var InteractionManager = require('InteractionManager');

var GooglePlacesAutocomplete = require('./Autocomplate').create({
  placeholder: 'Search',
  minLength: 2, // minimum length of text to search
  autoFocus: true,
  fetchDetails: true,
  onPress(data, details = null) { // details is provided when fetchDetails = true
    console.log(data);
    console.log(details);
  },
  getDefaultValue() {
    return ''; // text input default value
  },
  query: {
    // available options: https://developers.google.com/places/web-service/autocomplete
    key: API_KEY,
    language: 'en', // language of the results
    types: '(cities)', // default: 'geocode'
  },
  styles: {
    description: {
      fontWeight: 'bold',
    }
  }
});



var SearchScreen = React.createClass({
  getInitialState: function() {
    return {
      splashed: false,
      renderPlaceholderOnly:true,
      searchtext:"",
    };
  },
  back:function(){
    this.props.navigator.pop();
  },
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  },
  _renderPlaceholderView() {
    return (
        <View>
          <Text>Loading...</Text>
        </View>
    );
  },
  render: function() {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }
   // var toolbar = <DetailToolbar navigator={this.props.navigator} style={styles.toolbar}
   //   story={this.props.story}/>;
    /*
    *   <TextInput
     style={{height: 40,color:'#fff', borderColor: 'gray', borderWidth: 1,flex: 1}}
     onChangeText={(text) => this.setState({searchtext:text})}
     value={this.state.searchtext}
     autoFocus={true}
     underlineColorAndroid={'#fff'}
     placeholderTextColor={'#fffaaa'}
     placeholder="请输入搜索内容"
     />
     <View style={styles.searchbtn}><Text style={{color:'#fff'}}>搜索</Text></View>
    * */
      return (
          <View style={styles.container}>
            <View style={styles.searchbar}>
              <TouchableHighlight  underlayColor="#d0d0d0" onPress={this.back}>
                <View style={styles.backText}  ><Text style={{color:'#fff'}}>返回</Text></View>
              </TouchableHighlight>
            </View>
            <GooglePlacesAutocomplete />
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.scrollist}>
                <Text style={{color:'#000',fontSize: 18,}}>热门搜索</Text>
                <View style={{height:1,marginTop:5,backgroundColor:'#d0d0d0'}}></View>
                <View style={styles.searchbar1}>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>热门搜索</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>美甲美容</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>梦里花落知多少</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>小巧流坠人家</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>古道西风瘦马</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>pname</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>微信</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>商标咨询</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>什么</Text></View>
                </View>
                <Text style={{color:'#000',fontSize: 18,}}>搜索历史</Text>
                <View style={{height:1,marginTop:5,backgroundColor:'#d0d0d0'}}></View>
                <View style={styles.searchhistory}>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>热门搜索</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>美甲美容</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>搜索</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>梦里花落知多少</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>小巧流坠人家</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>古道西风瘦马</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>pname</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>微信</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>商标咨询</Text></View>
                  <View style={styles.searchbtntag}><Text style={{color:'#fff'}}>什么</Text></View>
                </View>
              </View>
            </ScrollView>

          </View>
      );
  }
});
//<View style={{position: 'absolute', top: 50,height:200,width:200,backgroundColor:'#fffaaa'}}></View>
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
    paddingTop:10,
    height: 56,
    flexDirection: 'row',
    backgroundColor:'#00a2ed',
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
  searchbtntag:{
    height: 36,
    marginBottom: 20,
    marginRight:1,
    marginLeft:10,
    padding: 5,
    paddingLeft:10,
    paddingRight:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00a2ed',
    borderRadius: 3,
  },
  scrollist:{
    marginTop:20,
  },
  backText:{
    height: 36,
    width:50,
    marginRight:10,
    paddingLeft: 5,
    paddingTop:5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchhistory:{
    marginTop:20,
    flex: 1,
    flexDirection: 'column',
  },
});

module.exports = SearchScreen;
