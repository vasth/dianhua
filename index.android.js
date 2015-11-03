/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule UIExplorerApp
 * @flow
 */
'use strict';

var React = require('react-native');

var {
    AppRegistry,
    BackAndroid,
    Text,
    TextInput,
    View,
    Navigator,
    StyleSheet,
    ScrollView,
    ToolbarAndroid,
    Image,
    ToastAndroid,
    TouchableNativeFeedback,
    TouchableHighlight,
    TouchableOpacity,
    } = React;

var ToolbarAndroid = require('ToolbarAndroid');

//var MainScreen = require('./MainScreen.android');
var DianhuaList = require('./DianhuaList');
var SearchScreen = require('./SearchScreen');
var API_KEY = 'AIzaSyCBWSkIpo37W3jsJD2g7NY8sSSzKZXo6iw';

var GooglePlacesAutocomplete = require('./Autocomplate').create({
    placeholder: 'Search',
    minLength: 1, // minimum length of text to search
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
        textInput:{
            height: 40,
            color:'#fff',
            borderColor: 'gray',
            borderWidth: 1,
            flex: 1
        },
        description: {
            fontWeight: 'bold',
        }
    }
});

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
    console.log("BackAndroid");
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        console.log(_navigator.getCurrentRoutes());
        console.log(_navigator.getCurrentRoutes().length);
        _navigator.pop();
        console.log(_navigator.getCurrentRoutes().length);
        return true;
    }
    console.log("false");
    console.log(_navigator);
    return false;
});

var dianhua = React.createClass({
    getInitialState: function() {
        return {
            splashed: false
        };
    },
    componentDidMount: function() {
        console.log("dianhua-didmount");
    },
    RouteMapper: function(route, navigationOperations) {//这里应该没有第三个参数
        _navigator = navigationOperations;

        switch (route.name) {
            case "home":
                return (
                    <View style={styles.container}>
                        <View style={styles.title}>
                            <Text style={styles.titleText} numberOfLines={5}> 店话 </Text>
                            <TouchableHighlight  underlayColor="#d0d0d0" onPress={this.search}>
                              <View style={styles.searchText}  ><Text style={{color:'#fff'}}>搜索</Text></View>
                            </TouchableHighlight>
                        </View>
                        <GooglePlacesAutocomplete />
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            <View style={styles.scrollist}>
                                {THUMBS.map(function(uri, index, array) {
                                    return <Thumb key={index}  item1={uri.item1} item2={uri.item2} navigator={navigationOperations} />
                                })}
                            </View>
                        </ScrollView>
                    </View>
                );
            case "story":
                return (
                    <View style={styles.container}>
                        <DianhuaList
                            style={{flex: 1}}
                            navigator={navigationOperations}
                            story={route.story} />
                    </View>
                );
            case "search":
                return (
                    <View style={styles.container}>
                        <SearchScreen
                            style={{flex: 1}}
                            navigator={navigationOperations}
                            story={route.story} />
                    </View>
                );
        }
    },

    onActionSelected: function(position) {
    },
    search:function(){
        _navigator.push({
            name: 'search',
        });
    },
    render: function() {
        var initialRoute = {name: 'home'};
        return (
            <Navigator
                style={styles.container}
                initialRoute={initialRoute}
                //configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                configureScene={(route) => Navigator.SceneConfigs.FloatFromBottom}
                renderScene={this.RouteMapper}
                />
        );
    }
});

/*搜索框view
* <View style={styles.searchbar}>
 <TextInput
 style={{height: 40, borderColor: 'gray', borderWidth: 1,flex: 1}}
 onChangeText={(text) => this.setState({text})}
 value={this.state.text}
 onFocus={this.search}
 placeholder="请输入搜索内容"
 />
 <View style={styles.searchbtn}><Text >搜索</Text></View>
 </View>
 */
var Thumb = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        return false;
    },
    componentDidMount: function() {
        console.log("didmount");
    },
    _onPressButton1:function(){
        console.log("onpress");
        this.props.navigator.push({
            name: 'story',
            story:  this.props.item1 ,
        });
    },
    _onPressButton2:function(){
        console.log("onpress");
        this.props.navigator.push({
            name: 'story',
            story:  this.props.item2 ,
        });
    },
    render: function() {
        return (
            <View style={styles.listitemcontent}>
                <View style={{height:0.5,backgroundColor:'#d0d0d0'}}></View>
                <View style={styles.listitem}>
                    <TouchableHighlight style={{flex: 1}} onPress={this._onPressButton1}>
                        <View  style={styles.list_item}>
                            <Text style={styles.list_item_text}>{this.props.item1}</Text>
                        </View >
                    </TouchableHighlight>
                    <View style={{height:39,width:0.5,marginTop:5,backgroundColor:'#d0d0d0'}}></View>
                    <TouchableHighlight style={{flex: 1}} onPress={this._onPressButton2}>
                        <View style={styles.list_item}>
                            <Text style={styles.list_item_text}>{this.props.item2}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
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

//var THUMBS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
// THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS
var createThumbRow = (uri, i) => <Thumb key={i}  item1={uri.item1} item2={uri.item2} />;

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
        backgroundColor: '#00a2ed',
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    titleText: {
        flex: 1,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    searchText:{
        height: 56,
        width:80,
        marginRight:10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        color:'#fff',
    },
    searchbar:{
        height: 56,
        paddingVertical: 20,
        flexDirection: 'row',
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
    listitemcontent:{
        marginLeft :10,
        marginRight :10,
        height: 51,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    listitem:{
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    list_item:{
        flex: 1,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    list_item_text:{
        fontSize: 15,
        textAlign: 'center',
        color:'#000',
    },
});

AppRegistry.registerComponent('dianhua', () => dianhua);
