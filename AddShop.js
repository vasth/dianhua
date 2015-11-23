/**
 * Created by Administrator on 15-11-20.
 */
'use strict';

var React = require('react-native');
var {
    PixelRatio,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TouchableHighlight,
    Platform,
    WebView,
    TextInput,
    ScrollView,
    } = React;


var PIXELRATIO = PixelRatio.get();//暂时没有用

var InteractionManager = require('InteractionManager');


var AddShopScreen = React.createClass({
    shop_name:"",
    shop_tel:"",
    shop_adress:"",
    shop_loc:"",
    shop_details:"",
    getInitialState: function() {
        return {
            splashed: false,
            renderPlaceholderOnly:true,
            
        };
    },
    back:function(){
        this.props.navigator.pop();//这里应该处理销毁所有正在请求的资源
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
    _urlForAddshop:function(){

    },
    updateText: function(text) {
        this.setState((state) => {
          return {
            curText: text,
            prevText: state.curText,
            prev2Text: state.prevText,
          };
        });
    },
    addshop:function(){
        //setNativeProps 
        // ToastAndroid.show(this.shop_name, ToastAndroid.SHORT);
        // ToastAndroid.show(this.shop_tel, ToastAndroid.SHORT);
        // ToastAndroid.show(this.shop_details, ToastAndroid.SHORT);

        //发送请求数据
        fetch("http://192.168.0.100:8080/addshop?shop_name="+this.shop_name+"&shop_tel="+this.shop_tel+"&shop_details="+this.shop_details)

        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
            ToastAndroid.show("连接服务器失败", ToastAndroid.SHORT);
        })
        .then((responseData) => { 
            // We reached the end of the list before the expected number of results
            if (responseData.status=="ok") {
                ToastAndroid.show("提交成功", ToastAndroid.SHORT);
                //resultsCache.totalForQuery[query] = moviesForQuery.length;
            } else {
                console.log(responseData);
                ToastAndroid.show("提交失败", ToastAndroid.SHORT);
            }
  
        })
        .done();
    },
    render: function() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={styles.container}>
                <View style={styles.searchbar}>
                    <TouchableHighlight  underlayColor="#d0d0d0" onPress={this.back}>
                        <View style={styles.backText}  ><Text style={{color:'#fff',fontSize:20}}>  返回 </Text></View>
                    </TouchableHighlight>
                    <View style={{flex:1}}></View>
                    <TouchableHighlight  underlayColor="#d0d0d0" onPress={this.addshop}>
                        <View style={styles.AddText}  ><Text style={{color:"#fff",fontSize:50,fontWeight:'300'}}> √  </Text></View>
                    </TouchableHighlight>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.searchpress}>
                        <TextInput
                            ref='shop_name'
                            value={this.state.text}
                            style={styles.textInput}
                            placeholder="请输入店铺名称"
                            onChangeText={(text) =>  this.shop_name = text}//原来这里的参数不是event，而是文字
                            clearButtonMode='while-editing'
                            returnKeyType='next'
                        />
                    </View>
                    <View style={styles.searchpress}>
                        <TextInput
                            ref='shop_tel'
                            style={styles.textInput}
                            placeholder="请输入联系电话"
                            onChangeText={(text) =>  this.shop_tel = text}
                            clearButtonMode='while-editing'
                            returnKeyType='next'
                        />
                    </View>
                    <View style={styles.searchpressmuil}>
                        <TextInput
                            ref='shop_details'
                            style={styles.textInput}
                            placeholder="请输入服务内容和范围"
                            onChangeText={(text) =>  this.shop_details = text}
                            multiline={true}
                            numberOfLines={5}
                            clearButtonMode='while-editing'
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
});

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
    searchpress:{
        marginLeft:15,
        marginRight:15,
        marginTop:10,
        //backgroundColor: '#D9D9D9',
        height:46,
        flexDirection: 'column',
        borderColor:'#C2C2C2',
        borderWidth:0.5,
    },
    searchpressmuil:{
        marginLeft:15,
        marginRight:15,
        marginTop:10,
        //backgroundColor: '#D9D9D9',
        height:96,
        flexDirection: 'column',
        borderColor:'#C2C2C2',
        borderWidth:0.5,
    },
    textInput: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // height: 28,
        borderRadius: 5,
        paddingTop: 4.5,
        paddingBottom: 4.5,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 15,
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
        //paddingTop:10,
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
        height: 56,
        justifyContent: 'center',
    },
    AddText:{
        height: 56,
        justifyContent: 'center',
    },
    searchhistory:{
        marginTop:20,
        flex: 1,
        flexDirection: 'column',
    },
});

module.exports = AddShopScreen;
