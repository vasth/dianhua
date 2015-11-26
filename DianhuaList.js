'use strict';

var React = require('react-native');
var {
    ActivityIndicatorIOS,
    AsyncStorage,
    ListView,
    Platform,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    } = React;
var TimerMixin = require('react-timer-mixin');

var invariant = require('invariant');
var dismissKeyboard = require('dismissKeyboard');

var MovieCell = require('./MovieCell');
//var MovieScreen = require('./MovieScreen');
//var SearchBar = require('SearchBar');

/**
 * This is for demo purposes only, and rate limited.
 * In case you want to use the Rotten Tomatoes' API on a real app you should
 * create an account at http://developer.rottentomatoes.com/
 */
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
//http://api.map.baidu.com/place/v2/eventsearch?query=%E6%8C%89%E6%91%A9&event=groupon&region=131&location=39.915,116.404&output=json&page_size=1&ak=KWQ2cAN6rQV6NdRP7uFXBiBi
 var API_KEYS = [
    '7waqfqbprs7pajbz28mqf6vz',
];
//var APP_URL = 'http://api.map.baidu.com/place/v2/eventsearch?';
//var APP_URL = 'http://api.map.baidu.com/place/v2/search';
//var APP_URL = 'http://182.92.1.8:8080/sh';
var APP_URL = 'http://192.168.0.100:8080/searchsh';


// Results should be cached keyed by the query
// with values of null meaning "being fetched"
// and anything besides null and undefined
// as the result of a valid query
var resultsCache = {
    dataForQuery: {},
    nextPageNumberForQuery: {},
    totalForQuery: {},
};

var LOADING = {};
var KEY_BAIDULOC_LAT = '@Latitude:';
var KEY_BAIDULOC_LON = '@Lontitude:';
var KEY_BAIDULOC_CITYCODE = '@Citycode:';

var DianhuaList = React.createClass({
    mixins: [TimerMixin],

    timeoutID: (null: any),
//componentWillReceiveProps:function(nextProps){
//    console.log("DianhuaList---WillReceiveProps");
//    console.log(nextProps);
//    //this.setState({
//    //    timethumbs:this.getDataSource( nextProps.timethumbs),
//    //});
//},
//shouldComponentUpdate: function ( nextProps,  nextState) {//组件是否更新
//    //return nextProps.isupdate;
//    return true;
//},
//componentWillUpdate: function ( nextProps,  nextState) {
//    console.log("DianhuaList---WillUpdate");
//    console.log(nextProps);
//    console.log(nextState);
//},
//componentDidUpdate: function ( nextProps,  nextState) {
//    console.log("DianhuaList---DidUpdate");
//    console.log(nextProps);
//    console.log(nextState);
//    //this.props.updatedkeyword();
//},
getInitialState: function() {
    return {
        isLoading: false,
        isLoadingTail: false,
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        filter: this.props.story,
        queryNumber: 0,
        querystr:this.props.story,
        region:0,
        location:'39.915,116.404',// latitude : 39.909251 lontitude : 116.582697
        page_size:1,
        errortext:'',
    };
},
async _loadInitialState() {
    console.log('_loadInitialState');
    storage.load({
        key: 'NRBaiduloc',
        //autoSync(default true) means if data not found or expired,
        //then invoke the corresponding sync method
        //autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
        autoSync: true,
        //syncInBackground(default true) means if data expired,
        //return the outdated data first while invoke the sync method.
        //It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
        //syncInBackground(默认为true)意味着如果数据过期，
        //在调用同步方法的同时先返回已经过期的数据。
        //设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: false
    }).then( ret => {                   //found data goes to then()
        this.setState({location: ""+ret.latitude+","+ret.lontitude});
        this.setState({region: ret.citycode});
        console.log(""+ret.latitude+","+ret.lontitude);
        console.log(ret.lontitude);
        console.log(ret.citycode);        //如果找到数据，则在then方法中返回
        if (this.props.story!=null){
            this.searchMovies(this.props.story);//找到数据后在搜索
        }else{
            this.searchMovies("美食");//找到数据后在搜索
        }
    }).catch( err => {                  //any exception including data not found
        console.warn(err);              //goes to catch()
                                        //如果没有找到数据且没有同步方法，
                                        //或者有其他异常，则在catch中返回
    });
},
_appendMessage:function(message){
    this.setState({errortext: message});
},
componentDidMount: function() {
    this._loadInitialState().done();
    //this.searchMovies(this.props.story);
},

_urlForQueryAndPage: function(query: string, pageNumber: number): string {
   // var apiKey = API_KEYS[this.state.queryNumber % API_KEYS.length];
 //http://api.map.baidu.com/place/v2/eventsearch?query=%E6%8C%89%E6%91%A9&event=groupon&region=131&location=39.915,116.404&output=json&page_size=1&ak=KWQ2cAN6rQV6NdRP7uFXBiBi
//http://api.map.baidu.com/place/v2/search?ak=KWQ2cAN6rQV6NdRP7uFXBiBi&output=json&query=%E7%BE%8E%E5%AE%B9%E7%BE%8E%E5%8F%91&page_size=10&page_num=0&scope=2&location=39.915,116.404&radius=20000
    if (query) {
        return (
            //API_URL + 'movies.json?apikey=' + apiKey + '&q=' +
            //encodeURIComponent(query) + '&page_limit=20&page=' + pageNumber
            APP_URL + '?query='+ encodeURIComponent(query) + '&region=' + this.state.region +
            '&location='+this.state.location + '&page_num='+ pageNumber +
            '&page_size=20'
        );
    } else {
        // With no query, load latest movies =====这里是要改的
        return (
            API_URL + 'lists/movies/in_theaters.json?apikey=' + apiKey +
            '&page_limit=20&page=' + pageNumber
        );
    }
},

searchMovies: function(query: string) {
    console.log("search movies");
    this.timeoutID = null;

    this.setState({filter: query});

    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
        if (!LOADING[query]) {
            this.setState({
                dataSource: this.getDataSource(cachedResultsForQuery),
                isLoading: false
            });
        } else {
            this.setState({isLoading: true});
        }
        return;
    }

    LOADING[query] = true;
    resultsCache.dataForQuery[query] = null;
    this.setState({
        isLoading: true,
        queryNumber: this.state.queryNumber + 1,
        isLoadingTail: false,
    });
    console.log(query);
    console.log(this._urlForQueryAndPage(query, 1));
    fetch(this._urlForQueryAndPage(query, 1))
        .then((response) => response.json())
        .catch((error) => {
            LOADING[query] = false;
            resultsCache.dataForQuery[query] = undefined;

            this.setState({
                dataSource: this.getDataSource([]),
                isLoading: false,
            });
        })
        .then((responseData) => {
            //if responseData.total > 
            LOADING[query] = false;
            resultsCache.totalForQuery[query] = responseData.total;
            resultsCache.dataForQuery[query] = responseData.results;
            resultsCache.nextPageNumberForQuery[query] = 2;

            if (this.state.filter !== query) {
                // do not update state if the query is stale
                return;
            }

            this.setState({
                isLoading: false,
                dataSource: this.getDataSource(responseData.results),
            });
        })
        .done();
},

hasMore: function(): boolean {
    var query = this.state.filter;
    if (!resultsCache.dataForQuery[query]) {
        return true;
    }
    return (
        resultsCache.totalForQuery[query] !== resultsCache.dataForQuery[query].length
    );
},

onEndReached: function() {
    var query = this.state.filter;
    if (!this.hasMore() || this.state.isLoadingTail) {
        // We're already fetching or have all the elements so noop
        return;
    }

    if (LOADING[query]) {
        return;
    }

    LOADING[query] = true;
    this.setState({
        queryNumber: this.state.queryNumber + 1,
        isLoadingTail: true,
    });

    var page = resultsCache.nextPageNumberForQuery[query];
    invariant(page != null, 'Next page number for "%s" is missing', query);
    console.log(this._urlForQueryAndPage(query, page));
    fetch(this._urlForQueryAndPage(query, page))
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
            LOADING[query] = false;
            this.setState({
                isLoadingTail: false,
            });
        })
        .then((responseData) => {
            var moviesForQuery = resultsCache.dataForQuery[query].slice();

            LOADING[query] = false;
            // We reached the end of the list before the expected number of results
            if (!responseData.results) {
                resultsCache.totalForQuery[query] = moviesForQuery.length;
            } else {
                for (var i in responseData.results) {
                    moviesForQuery.push(responseData.results[i]);
                }
                resultsCache.dataForQuery[query] = moviesForQuery;
                resultsCache.nextPageNumberForQuery[query] += 1;
            }

            if (this.state.filter !== query) {
                // do not update state if the query is stale
                return;
            }

            this.setState({
                isLoadingTail: false,
                dataSource: this.getDataSource(resultsCache.dataForQuery[query]),
            });
        })
        .done();
},

getDataSource: function(movies: Array<any>): ListView.DataSource {
    console.log(movies);
    return this.state.dataSource.cloneWithRows(movies);
},

selectMovie: function(movie: Object) {
    //if (Platform.OS === 'ios') {
    //    this.props.navigator.push({
    //        title: movie.title,
    //        component: MovieScreen,
    //        passProps: {movie},
    //    });
    //} else {
    dismissKeyboard();
    this.props.navigator.push({
        title: movie.title,
        name: 'story',
        story: movie.name,
    });
    //this.props.navigator.push({
    //    title: movie.title,
    //    name: 'home',
    //    story: movie.name,
    //});
    // }
},
addshop: function() {
    this.props.navigator.push({
        name: 'addshop',
    });
},
onSearchChange: function(event: Object) {
    var filter = event.nativeEvent.text.toLowerCase();

    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchMovies(filter), 100);
},

renderFooter: function() {
    if (!this.hasMore() || !this.state.isLoadingTail) {
        return <View style={styles.scrollSpinner} />;
    }

    if (Platform.OS === 'ios') {
        return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    } else {
        return (
            <View  style={{alignItems: 'center'}}>
                <ProgressBarAndroid styleAttr="Large"/>
            </View>
        );
    }
},

renderSeparator: function(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
        <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
},

renderRow: function(
    movie: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
) {
    return (
        <MovieCell style={{margin:5}}
            key={movie.uid}
            onSelect={() => this.selectMovie(movie)}
            onHighlight={() => highlightRowFunc(sectionID, rowID)}
            onUnhighlight={() => highlightRowFunc(null, null)}
            movie={movie}
            />
    );
},

render: function() {
    /*    <Text>{this.state.errortext}</Text>
     <Text>{this.state.region}</Text>
     <Text>{this.state.location}</Text>*/

    var content = this.state.dataSource.getRowCount() === 0 ?
        <View style={styles.container}>
            <View style={styles.searchbar}>
                <TouchableHighlight  underlayColor="#d0d0d0" onPress={this.back}>
                    <View style={styles.backText}  ><Text style={{color:'#fff',fontSize:20}}>  返回 </Text></View>
                </TouchableHighlight>
                <View style={{flex:1}}></View>
                <TouchableHighlight  underlayColor="#d0d0d0" onPress={this.addshop}>
                    <View style={styles.AddText}  ><Text style={{color:"#fff",fontSize:50,fontWeight:'300'}}> ＋</Text></View>
                </TouchableHighlight>
            </View>
            <NoMovies
                filter={this.state.filter}
                isLoading={this.state.isLoading}
                />
        </View>
        :
        <View style={styles.container}>
            <View style={styles.searchbar}>
                <TouchableHighlight  underlayColor="#d0d0d0" onPress={this.back}>
                    <View style={styles.backText}  ><Text style={{color:'#fff',fontSize:20}}>  返回 </Text></View>
                </TouchableHighlight>
                <View style={{flex:1}}></View>
                <TouchableHighlight  underlayColor="#d0d0d0" onPress={this.addshop}>
                    <View style={styles.AddText}  ><Text style={{color:"#fff",fontSize:50,fontWeight:'300'}}> ＋</Text></View>
                </TouchableHighlight>
            </View>
            <ListView
                ref="listview"
                renderSeparator={this.renderSeparator}
                dataSource={this.state.dataSource}
                renderFooter={this.renderFooter}
                renderRow={this.renderRow}
                onEndReached={this.onEndReached}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
                style={styles.dianhuaList}
                />
        </View>;

    return (
        <View style={styles.container}>
            <View style={styles.separator} />
            {content}
        </View>
    );
},
back: function() {
    this.props.navigator.pop();//这里应该处理销毁所有正在请求的资源
},
});

//<SearchBar
//    onSearchChange={this.onSearchChange}
//    isLoading={this.state.isLoading}
//    onFocus={() =>
//this.refs.listview && this.refs.listview.getScrollResponder().scrollTo(0, 0)}
//    />

var NoMovies = React.createClass({
    render: function() {
        var text = '正在加载中 ...';
        if (this.props.filter) {
            text = `No results for "${this.props.filter}"`;
        } else if (!this.props.isLoading) {
            // If we're looking at the latest movies, aren't currently loading, and
            // still have no results, show a message
            text = 'No movies found';
        }

        //这里没有判断是否是加载失败
        if (Platform.OS === 'ios') {
            return (
                <View style={[styles.container, styles.centerText]}>
                    <ActivityIndicatorIOS style={styles.scrollSpinner} />
                    <Text style={styles.noMoviesText}>{text}</Text>
                </View>
            );
        } else {
            return (
                <View style={[styles.container, styles.centerText]}>
                    <View  style={[styles.noMoviecontent,{alignItems: 'center'}]}>
                        <ProgressBarAndroid styleAttr="Large"/>
                        <Text style={styles.noMoviesText}>{text}</Text>
                    </View>

                </View>
            );
        }


    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //  backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    searchbar:{
        height: 56,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor:'#00a2ed',
    },
    backText:{
        height: 56,
        justifyContent: 'center',
    },
    AddText:{
        height: 56,
        justifyContent: 'center',
    },
    centerText: {
        alignItems: 'center',
    },
    noMoviecontent: {
        marginTop: 100,
    },
    noMoviesText: {
        marginTop: 10,
        color: '#888888',
    },
    dianhuaList:{
        padding:5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    separator: {//无listview是的界面
        height: 1,
        backgroundColor: '#eeeeee',
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    rowSeparator: {
        //backgroundColor: 'rgba(0, 0, 0, 0)',
        height:5,
        marginLeft: 4,
    },
    rowSeparatorHide: {
        opacity: 0.0,
    },

});

module.exports = DianhuaList;
