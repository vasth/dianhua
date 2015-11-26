/**
 * Created by Administrator on 15-11-17.
 */
/* globals XMLHttpRequest: true */
'use strict';

var React = require('react-native');
var {StyleSheet, TextInput, View, ListView, Image, Text, Dimensions, TouchableHighlight, Platform, ActivityIndicatorIOS, ProgressBarAndroid} = React;
var Qs = require('qs');
var extend = require('extend');

exports.create = function(options = {}) {
    options.placeholder = options.placeholder || 'Search';
    options.onPress = options.onPress || () => {};
    options.onSub = options.onSub || () => {};
    options.minLength = options.minLength || 0;
    options.fetchDetails = options.fetchDetails || false;
    options.autoFocus = options.autoFocus || false;
    options.getDefaultValue = options.getDefaultValue || function() { return ''; };
    options.timeout = options.timeout || 20000;
    options.onTimeout = options.onTimeout || () => {
        console.warn('google places autocomplete: request timeout');
    };

    //options.query.key = options.query.key || 'missing api key';
    //options.query.language = options.query.language || 'en';
    //options.query.types = options.query.types || 'geocode';

    var defaultStyles = {
        container: {

        },
        textInputContainer: {
            marginLeft:15,
            marginRight:15,
            marginTop:10,
            //backgroundColor: '#D9D9D9',
            height:46,
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
        poweredContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        powered: {
            marginTop: 15,
        },
        listView: {
            height: Dimensions.get('window').height - 44,
        },
        row: {
            padding: 13,
            height: 44,
            flexDirection: 'row',
        },
        separator: {
            height: 1,
            backgroundColor: '#c8c7cc',
        },
        keyword: {
        },
        loader: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
        },
        androidLoader: {
            marginRight: -15
        },
    };

    var styles = StyleSheet.create(extend(defaultStyles, options.styles));

    var SearchAutocomplete = React.createClass({
        getInitialState() {
            var ds = new ListView.DataSource({rowHasChanged: function(r1, r2) {
                if (typeof r1.isLoading !== 'undefined') {
                    return true;
                }
                return r1 !== r2;
            }});
            return {
                text: options.getDefaultValue(),
                dataSource: ds.cloneWithRows([]),
                listViewDisplayed: false,
            };
        },
        _abortRequests() {
            for (let i = 0; i < this._requests.length; i++) {
                this._requests[i].abort();
            }
            this._requests = [];
        },
        componentWillUnmount() {
            this._abortRequests();
        },
        _enableRowLoader(rowData) {
            for (let i = 0; i < this._results.length; i++) {
                if (this._results[i].place_id === rowData.id) {
                    this._results[i].isLoading = true;
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this._results),
                    });
                    break;
                }
            }
        },
        _disableRowLoaders() {
            if (this.isMounted()) {//只有组件还处于挂载状态下，才有setState从而更新视图的意义。
                for (let i = 0; i < this._results.length; i++) {
                    if (this._results[i].isLoading === true) {
                        this._results[i].isLoading = false;
                    }
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._results),
                });
            }
        },
        _submit(text){
            if (text.length >= options.minLength) {
                options.onSub(this.props.nav,text);
            }
        },
         _onPress(rowData) {  //这里需要改
            if (options.fetchDetails === true) {//这里一般没有用，如果有用的话就在create方法里面更改
                //if (rowData.isLoading === true) {
                //    // already requesting
                //    return;
                //} else {
                //    this._abortRequests();
                //}
                //
                //// display loader
                //this._enableRowLoader(rowData);
                //
                //// fetch details
                //var request = new XMLHttpRequest();
                //this._requests.push(request);
                //request.timeout = options.timeout;
                //request.ontimeout = options.onTimeout;
                //request.onreadystatechange = (e) => {
                //    if (request.readyState !== 4) {
                //        return;
                //    }
                //    if (request.status === 200) {
                //        var responseJSON = JSON.parse(request.responseText);
                //        if (responseJSON.status === 'OK') {
                //            if (this.isMounted()) {
                //                var details = responseJSON.result;
                //                this._disableRowLoaders();
                //                if (typeof this.refs.textInput.blur === 'function') {
                //                    this.refs.textInput.blur();
                //                }
                //
                //                this.setState({
                //                    text: rowData.keyword,
                //                    listViewDisplayed: false,
                //                });
                //
                //                delete rowData.isLoading;
                //                options.onPress(rowData, details);
                //            }
                //        } else {
                //            this._disableRowLoaders();
                //            console.warn('google places autocomplete: '+responseJSON.status);
                //        }
                //    } else {
                //        this._disableRowLoaders();
                //        console.warn("google places autocomplete: request could not be completed or has been aborted");
                //    }
                //};
                //console.warn('https://maps.googleapis.com/maps/api/place/details/json?'+Qs.stringify({
                //        key: options.query.key,
                //        placeid: rowData.place_id,
                //        language: options.query.language,
                //    }));
                ////这里需要更改请求
                //request.open('GET', 'https://maps.googleapis.com/maps/api/place/details/json?'+Qs.stringify({
                //        key: options.query.key,
                //        placeid: rowData.place_id,
                //        language: options.query.language,
                //    }));
                ////request.open('GET', 'https://192.168.0.100/siipa/baojia/json.php?country='+encodeURI(text));
                //request.send();
            } else {
                this.setState({
                    text: rowData.keyword,
                    listViewDisplayed: false,
                });

                if (typeof this.refs.textInput.blur === 'function') {
                    this.refs.textInput.blur();
                }
                delete rowData.isLoading;
                options.onPress(this.props.nav,rowData);
            }
        },
        _results: [],
        _requests: [],
        _request(text) {
            this._abortRequests();
            if (text.length >= options.minLength) {
                var request = new XMLHttpRequest();
                this._requests.push(request);
                request.timeout = options.timeout;
                request.ontimeout = options.onTimeout;
                request.onreadystatechange = (e) => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        var responseJSON = JSON.parse(request.responseText);
                        if (typeof responseJSON.predictions !== 'undefined'&& responseJSON.status == 'ok') {
                            if (this.isMounted()) {
                                this._results = responseJSON.predictions;
                                this.setState({
                                    dataSource: this.state.dataSource.cloneWithRows(responseJSON.predictions),
                                });
                            }
                        }else {
                            //this._results = []; ---这里修改了
                            this._results = [{"keyword": text,"id": "0"}];
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(this._results),
                            });
                        }

                        if (typeof responseJSON.error_message !== 'undefined') {
                            console.warn('google places autocomplete: '+responseJSON.error_message);
                        }
                    } else {
                        //---这里新增默认关键字不为空
                        this._results = [{"keyword": text,"id": "0"}];
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(this._results),
                        });
                        //console.warn("google places autocomplete: request could not be completed or has been aborted");
                    }
                };

                //console.warn('https://maps.googleapis.com/maps/api/place/autocomplete/json?&input='+encodeURI(text)+'&'+Qs.stringify(options.query));
                //request.open('GET', 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input='+encodeURI(text)+'&'+Qs.stringify(options.query));
                //这里需要更改请求
                //console.warn('http://192.168.0.100/siipa/baojia/json.php?country='+encodeURI(text));
                //request.open('GET', 'http://192.168.0.100/siipa/baojia/json.php?country='+encodeURI(text));
                console.warn(encodeURI(text));
                console.warn(text);
                request.open('GET', 'http://192.168.0.100:8080/searchkw?word='+encodeURI(text));

                request.send();
            } else {
                this._results = [];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows([]),
                });
            }
        },
        _onChangeText(text) {
            this._request(text);
            this.setState({
                text: text,
                listViewDisplayed: true,
            });
        },
        _getRowLoader() {
            if (Platform.OS === 'android') {
                /* jshint ignore:start */
                return (
                    <ProgressBarAndroid
                        style={styles.androidLoader}
                        styleAttr="Inverse"
                    />
                );
            } else {
                return (
                    <ActivityIndicatorIOS
                        animating={true}
                        size="small"
                    />
                );
                /* jshint ignore:end */
            }
        },
        _renderRow(rowData = {}) {
            rowData.keyword = rowData.keyword || 'Unknown';
            /* jshint ignore:start */
            return (
                <TouchableHighlight
                    onPress={() =>
                        this._onPress(rowData)
                      }
                        underlayColor="#c8c7cc"
                    >
                    <View>
                        <View style={styles.row}>
                            <Text
                                style={styles.keyword}
                                numberOfLines={1}
                            >{rowData.keyword}</Text>
                            <View
                                style={styles.loader}
                            >
                                {rowData.isLoading === true ? this._getRowLoader() : null}
                            </View>
                        </View>
                        <View style={styles.separator} />
                    </View>
                </TouchableHighlight>
            );
            /* jshint ignore:end */
        },
        _onBlur() {
            this.setState({listViewDisplayed: false});
        },
        _onFocus() {
            this.setState({listViewDisplayed: true});
        },
        _getListView() {
            if (this.state.text !== '' && this.state.listViewDisplayed === true) {
                /* jshint ignore:start */
                return (
                    <ListView
                        keyboardShouldPersistTaps={true}
                        style={styles.listView}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        automaticallyAdjustContentInsets={false}
                    />
                );
            } else {
                return (
                    <View style={styles.poweredContainer}>

                    </View>
                );
            }
        },
        render() {
            /* jshint ignore:start */
            return (
                <View style={styles.container}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            ref='textInput'
                            autoFocus={options.autoFocus}
                            style={styles.textInput}
                            onChangeText={this._onChangeText}
                            value={this.state.text}
                            placeholder={options.placeholder}
                            onBlur={this._onBlur}
                            onFocus={this._onFocus}
                            onSubmitEditing={(event) => this._submit(event.nativeEvent.text)}
                            keyboardType="web-search"
                            returnKeyType="search"
                            clearButtonMode="while-editing"
                        />
                    </View>
                    {this._getListView()}
                </View>
            );
            /* jshint ignore:end */
        },
    });
    return SearchAutocomplete;
};