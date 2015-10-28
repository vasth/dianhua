'use strict';

var React = require('react-native');
var {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  ToastAndroid,
  BackAndroid,
  TouchableOpacity,
  Dimensions,
} = React;

var Drawer = require('react-native-drawer');
var StoriesList = require('./StoriesList');
var ThemesList = require('./ThemesList');
var MenuList = require('./MenuList');

var DRAWER_REF = 'drawer';
var DRAWER_WIDTH_LEFT = 56;
var toolbarActions = [
  {title: '提醒', icon: require('image!ic_create_black_48dp'), show: 'always'},
  {title: '夜间模式', show: 'never'},
  {title: '设置选项', show: 'never'},
];

//BackAndroid.addEventListener('hardwareBackPress', function() {
//  MenuList.setProps({isokopen: false});
//  MenuList.props({isokopen: false});
//  return true;
//});

var data = {
  "全部区域": {
    "全部区域": ["全部区域"],
    "热门商圈": [
      "虹桥地区",
      "徐家汇地区",
      "淮海路商业区",
      "静安寺地区",
      "上海火车站地区",
      "浦东陆家嘴金融贸易区",
      "四川北路商业区",
      "人民广场地区",
      "南翔、安亭汽车城"
    ],
    "热门行政区": [
      "静安区",
      "徐汇区",
      "长宁区",
      "黄埔区",
      "虹口区",
      "宝山区",
      "闸北区"
    ]
  },
  "地铁沿线":{
    "地铁全线": ["地铁全线"],
    "一号线": ["莘庄站", "外环路站", "莲花路站", "锦江乐园站", "上海南站站", "漕宝路站"],
    "二号线": ["浦东国际机场站", "海天三路站", "远东大道站", "凌空路站"]
  }
};

var MainScreen = React.createClass({
  getInitialState: function () {
    return ({
      theme: null,
    });
  },
  onSelectTheme: function (theme) {
    this.refs[DRAWER_REF].closeDrawer();
    this.setState({theme: theme});
  },
  _renderNavigationView: function () {
    return (
        <ThemesList
            onSelectItem={this.onSelectTheme}
            />
    );
  },
  onRefresh: function () {
    this.onSelectTheme(this.state.theme);
  },
  onRefreshFinish: function () {
    this.swipeRefreshLayout && this.swipeRefreshLayout.finishRefresh();
  },
  render: function () {
    var title = this.state.theme ? this.state.theme.name : '首页';
    return (
        <DrawerLayoutAndroid
            ref={DRAWER_REF}
            drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
            keyboardDismissMode="on-drag"
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={this._renderNavigationView}>
          <View style={styles.container}>
            <ToolbarAndroid
                navIcon={require('image!ic_menu_white')}
                title={title}
                titleColor="white"
                style={styles.toolbar}
                actions={toolbarActions}
                onIconClicked={() => this.refs[DRAWER_REF].openDrawer()}
                onActionSelected={this.onActionSelected}/>
            <View style={{marginTop:0}}>
              <MenuList data={data} isokopen={false}  click={this.onPress}/>
            </View>
            <StoriesList theme={this.state.theme} navigator={this.props.navigator}
                         onRefreshFinish={this.onRefreshFinish}/>
          </View>
        </DrawerLayoutAndroid>

    );
  },
  onPress: function (val) {
    //alert(val);
    this.setState({
      tabSelected: index,
      isokopen: true,
    });
    ToastAndroid.show(val, ToastAndroid.SHORT);
  }
});
//<MenuList data={data} nSelected={1} tabSelected={0} click={this.onPress}/>
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
  },
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
  },
});

module.exports = MainScreen;
